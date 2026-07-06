import os
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Body, Header
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from dotenv import load_dotenv
import urllib.request
import json

load_dotenv()

app = FastAPI(title="Sutra Bistro API")

# Cache & Config
CACHE = {"data": None}
GAS_URL = "https://script.google.com/macros/s/AKfycbyoCVd3F3Fvxefk0iOE4ki1PqrKhrHD5bucCxPwu0mXmdUoDID2Kr2spYzYKOKCXk46/exec"
WEBHOOK_API_KEY = os.getenv("API_KEY", "super_secret_sutra_token_123")

def fetch_sheet_data():
    req = urllib.request.Request(GAS_URL)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

# CORS Configuration
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "sutra_bistro")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Models
class ReservationBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    phone: str = Field(..., min_length=6, max_length=20)
    email: Optional[EmailStr] = None
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$") # YYYY-MM-DD
    time: str = Field(..., pattern=r"^\d{2}:\d{2}$")     # HH:MM
    guests: int = Field(..., ge=1, le=30)
    location: Optional[str] = "Vijay Nagar"
    message: Optional[str] = Field(None, max_length=500)

class Reservation(ReservationBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    message: str

class Contact(ContactBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Routes
@app.get("/api")
async def root():
    return {"message": "Sutra Bistro API is live."}

@app.get("/api/data")
async def get_data():
    if CACHE["data"] is None:
        CACHE["data"] = fetch_sheet_data()
    return CACHE["data"]

@app.post("/api/publish")
async def publish_data(x_api_key: str = Header(...)):
    if x_api_key != WEBHOOK_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")
    CACHE["data"] = fetch_sheet_data()
    return {"status": "success", "message": "Cache refreshed with latest data"}

@app.post("/api/reservations", response_model=Reservation)
async def create_reservation(reservation: ReservationBase):
    res_obj = Reservation(**reservation.model_dump())
    await db.reservations.insert_one(res_obj.model_dump())
    return res_obj

@app.get("/api/reservations", response_model=List[Reservation])
async def list_reservations():
    cursor = db.reservations.find({}, {"_id": 0}).sort("created_at", -1).limit(500)
    return await cursor.to_list(length=500)

@app.post("/api/contact", response_model=Contact)
async def create_contact(contact: ContactBase):
    contact_obj = Contact(**contact.model_dump())
    await db.contact.insert_one(contact_obj.model_dump())
    return contact_obj

@app.get("/api/contact", response_model=List[Contact])
async def list_contacts():
    cursor = db.contact.find({}, {"_id": 0}).sort("created_at", -1).limit(500)
    return await cursor.to_list(length=500)

@app.get("/api/status")
@app.post("/api/status")
async def status():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
