// background.js — Pigeon 🐦 (MV3 Service Worker)

const API_URL = "http://localhost:8000/classify";

let lastEmails = [];
let lastResult = [];

// Listener global
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  // 📩 Correos desde Gmail
  if (message.type === "PIGEON_EMAILS_EXTRACTED") {
    lastEmails = message.emails;
    classifyEmails(message.emails);
  }

  // 🔁 Popup pide reclasificar
  if (message.type === "PIGEON_REQUEST_CLASSIFICATION") {
    if (lastEmails.length > 0) {
      classifyEmails(lastEmails);
    }
  }

  // 📤 Popup pide último resultado
  if (message.type === "PIGEON_GET_LAST_RESULT") {
    sendResponse({ data: lastResult });
    return true;
  }
});

// Clasificación ML
async function classifyEmails(emails) {
  try {
    const response = await fetch("http://localhost:8000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails })
    });

    if (!response.ok) {
      throw new Error("Error en backend");
    }

    const data = await response.json();

    chrome.runtime.sendMessage({
      type: "PIGEON_CLASSIFICATION_RESULT",
      data
    });

  } catch (err) {
    chrome.runtime.sendMessage({
      type: "PIGEON_ERROR",
      error: "Backend ML no disponible"
    });
  }
}