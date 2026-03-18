# 🐦 Pigeon

> **Intelligent email classification, right in your browser.**

Pigeon is a web extension that automatically classifies and organizes your emails using Machine Learning. Powered by a FastAPI backend and Python-based ML models, Pigeon processes your inbox in real time — no manual sorting required.

---

## ✨ Features

- 📬 **Automatic email classification** — categorizes emails into relevant folders intelligently
- ⚡ **Fast & efficient** — FastAPI backend ensures low-latency responses
- 🤖 **ML-powered** — Python-based machine learning model trained for accurate classification
- 🌐 **Browser extension** — works seamlessly as a web extension in your daily workflow
- 🔒 **Privacy-focused** — processing is handled securely through the backend API
- 📋 **Manifest V3** — built on the latest Chrome extension standard for improved security and performance

---

## 🏗️ Architecture

```
┌─────────────────────┐        HTTP/REST        ┌──────────────────────┐
│   Browser Extension │ ──────────────────────► │   FastAPI Backend    │
│   (Web Extension)   │ ◄────────────────────── │   (Python + ML)      │
└─────────────────────┘     JSON Response        └──────────────────────┘
                                                          │
                                                          ▼
                                                ┌──────────────────────┐
                                                │   ML Classification  │
                                                │   Model (Python)     │
                                                └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- pip
- A Chromium-based browser (Chrome, Edge, Brave, etc.)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pigeon.git
cd pigeon
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the FastAPI server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`. You can explore the auto-generated docs at `http://localhost:8000/docs`.

### 4. Load the browser extension

1. Open your browser and navigate to `chrome://extensions/`
2. Enable **Developer Mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `extension/` folder from this repository

---

## 📁 Project Structure

```
pigeon/
├── backend/
│   ├── main.py               # FastAPI app entry point
│   ├── model/
│   │   ├── classifier.py     # ML classification logic
│   │   └── train.py          # Model training script
│   ├── routers/
│   │   └── classify.py       # Classification endpoints
│   ├── requirements.txt
│   └── .env.example
├── extension/
│   ├── manifest.json         # Web extension manifest
│   ├── background.js         # Service worker
│   ├── content.js            # Content script
│   ├── popup/
│   │   ├── popup.html
│   │   └── popup.js
│   └── icons/
├── tests/
│   ├── test_api.py
│   └── test_model.py
└── README.md
```

---

## 🔌 API Reference

### `POST /classify`

Classifies an email and returns a category label.

**Request body:**
```json
{
  "subject": "Your invoice for March",
  "body": "Please find attached your invoice for the month of March..."
}
```

**Response:**
```json
{
  "category": "Finance",
  "confidence": 0.94
}
```

---

## 🧠 ML Model

The classification model is built with Python and trained on labeled email datasets. It supports categories such as:

| Category     | Examples                              |
|--------------|---------------------------------------|
| 📦 Shopping  | Order confirmations, shipping updates |
| 💼 Work      | Meeting invites, project updates      |
| 💰 Finance   | Invoices, bank alerts, receipts       |
| 🗞️ Newsletter | Subscriptions, promotional emails     |
| 🔐 Spam       | Phishing attempts, unwanted bulk mail |
| 👤 Personal   | Messages from friends and family      |

---

## 📋 Manifest V3

Pigeon uses **Manifest V3**, the current Chrome extension standard. Key aspects of the implementation:

- **Service Worker** — `background.js` runs as a service worker (no persistent background page)
- **`chrome.scripting` API** — used to inject content scripts programmatically
- **`host_permissions`** — explicit permission declaration for `https://mail.google.com/*`
- **No remote code** — all logic is bundled locally for security compliance

```json
{
  "manifest_version": 3,
  "name": "Pigeon",
  "version": "1.0.0",
  "permissions": ["activeTab", "scripting", "storage"],
  "host_permissions": ["https://mail.google.com/*"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup/popup.html"
  }
}
```

---

## 🧪 Running Tests

```bash
cd backend
pytest tests/
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

<p align="center">Made with love and a lot of coffee</p>
