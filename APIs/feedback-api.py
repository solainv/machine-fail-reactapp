from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# CORS-Einstellungen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Erlaube Anfragen von allen Ursprüngen
    allow_credentials=True,  # Erlaube Cookies in Anfragen
    allow_methods=["*"],  # Erlaube bestimmte HTTP-Methoden
    allow_headers=["*"],  # Erlaube alle Header in Anfragen
)



# SQLite-Datenbankverbindung
conn = sqlite3.connect('feedbacks.db')
c = conn.cursor()

# Tabelle für Feedbacks erstellen, wenn sie nicht existiert
c.execute('''CREATE TABLE IF NOT EXISTS feedbacks
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             email TEXT,
             feedback TEXT)''')
conn.commit()

class Feedback(BaseModel):
    name: str
    email: str
    feedback: str

@app.post("/api/feedback")
async def submit_feedback(feedback: Feedback):
    # Feedback in SQLite-Datenbank einfügen
    c.execute("INSERT INTO feedbacks (name, email, feedback) VALUES (?, ?, ?)",
              (feedback.name, feedback.email, feedback.feedback))
    conn.commit()
    return {"message": "Feedback received successfully"}

@app.get("/api/feedbacks")
async def get_feedbacks():
    # Alle Feedbacks aus der SQLite-Datenbank abrufen
    c.execute("SELECT * FROM feedbacks")
    rows = c.fetchall()
    feedbacks = [{"id": row[0], "name": row[1], "email": row[2], "feedback": row[3]} for row in rows]
    return feedbacks

@app.delete("/api/feedback/{feedback_id}")
async def delete_feedback(feedback_id: int):
    c.execute("DELETE FROM feedbacks WHERE id=?", (feedback_id,))
    conn.commit()
    return {"message": f"Feedback with ID {feedback_id} deleted successfully"}
