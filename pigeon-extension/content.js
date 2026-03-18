// content.js — Pigeon 🐦
console.log("🐦 Pigeon content.js cargado");
// Extrae correos visibles del DOM
function extractEmails() {
  const rows = document.querySelectorAll("tr.zA");
  const emails = [];

  rows.forEach(row => {
    const sender = row.querySelector(".yX.xY .yW")?.innerText || "";
    const subject = row.querySelector(".y6 span")?.innerText || "";
    const snippet = row.querySelector(".y2")?.innerText || "";

    if (subject) {
      emails.push({ sender, subject, snippet });
    }
  });

  return emails;
}

// Envía correos al background
function sendEmails() {
  const emails = extractEmails();

  if (emails.length === 0) return;

  chrome.runtime.sendMessage({
    type: "PIGEON_EMAILS_EXTRACTED",
    emails
  });
}

// Espera a que Gmail esté listo
function waitForGmail() {
  const inbox = document.querySelector("table.F.cf.zt");

  if (inbox) {
    sendEmails();
    observeChanges();
  } else {
    setTimeout(waitForGmail, 1000);
  }
}

// Observa cambios en la lista de correos
function observeChanges() {
  const target = document.querySelector("div[role='main']");
  if (!target) return;

  const observer = new MutationObserver(() => {
    sendEmails();
  });

  observer.observe(target, {
    childList: true,
    subtree: true
  });
}

// Init
waitForGmail();