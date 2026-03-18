import joblib

# Cargar modelo y vectorizador UNA SOLA VEZ
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def classify_emails(emails):
    texts = [f"{e['subject']} {e.get('snippet', '')}" for e in emails]
    X = vectorizer.transform(texts)
    predictions = model.predict(X)

    return [
        {
            "subject": email["subject"],
            "snippet": email.get("snippet", ""),
            "sender": email.get("sender", ""),  
            "label": str(label)                 
        }
        for email, label in zip(emails, predictions)
    ]