from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import classify_emails

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Email(BaseModel):
    subject: str
    snippet: str = ""

class EmailRequest(BaseModel):
    emails: list[Email]

@app.post("/classify")
def classify(req: EmailRequest):
    emails = [e.dict() for e in req.emails]
    return classify_emails(emails)