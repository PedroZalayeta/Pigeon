// popup.js — Pigeon 🐦
const emailList = document.getElementById("email-list");
const refreshBtn = document.getElementById("refresh");
let allEmails = [];
let currentFilter = "all";

// --------------------
// UI helpers
// --------------------
function showLoading() {
  emailList.innerHTML = `
    <div class="state loading">
      <div class="spinner"></div>
      Analizando correos…
    </div>
  `;
}

function showError(msg) {
  emailList.innerHTML = `<div class="state">❌ ${msg}</div>`;
}

function renderEmails(emails) {
  allEmails = emails;
  emailList.innerHTML = "";

  const filtered = currentFilter === "all"
    ? emails
    : emails.filter(e => e.label === currentFilter);

  if (filtered.length === 0) {
    emailList.innerHTML = `<div class="state">No hay correos para este filtro</div>`;
    return;
  }

  filtered.forEach(email => {
    const div = document.createElement("div");
    div.className = `email ${email.label || ""}`;
    div.innerHTML = `
      <strong>${email.subject}</strong>
      <p>${email.snippet || ""}</p>
      <small>${email.label}</small>
    `;
    emailList.appendChild(div);
  });
}

// --------------------
// Comunicación
// --------------------
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === "PIGEON_CLASSIFICATION_RESULT") {
    renderEmails(msg.data);
  }
  if (msg.type === "PIGEON_ERROR") {
    showError(msg.error);
  }
});

refreshBtn.addEventListener("click", () => {
  showLoading();
  chrome.runtime.sendMessage({ type: "PIGEON_REQUEST_CLASSIFICATION" });
});

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderEmails(allEmails);
  });
});

// --------------------
// Init (un solo DOMContentLoaded)
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  showLoading();

  // Pide último resultado
  chrome.runtime.sendMessage({ type: "PIGEON_GET_LAST_RESULT" }, response => {
    if (response?.data?.length) {
      renderEmails(response.data);
    } else {
      chrome.runtime.sendMessage({ type: "PIGEON_REQUEST_CLASSIFICATION" });
    }
  });

  // Footer
  const footer = document.createElement("div");
  footer.id = "pigeon-footer";
  footer.innerHTML = `
    <span id="pigeon-link">Pigeon <small>v${chrome.runtime.getManifest().version}</small></span>
  `;
  document.body.appendChild(footer);

  document.getElementById("pigeon-link").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://github.com/PedroZalayeta" });
  });
});