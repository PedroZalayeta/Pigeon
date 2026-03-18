import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import nltk
nltk.download("stopwords")
from nltk.corpus import stopwords

spanish_stopwords = stopwords.words("spanish")
vectorizer = TfidfVectorizer(stop_words=spanish_stopwords)
df = pd.read_csv("data/train.csv")

# Combinar subject y snippet en una sola columna de texto
X = df["subject"] + " " + df["snippet"].fillna("")
y = df["label"]

X_vec = vectorizer.fit_transform(X)

model = LogisticRegression()
model.fit(X_vec, y)

joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
print("Modelo entrenado y guardado")