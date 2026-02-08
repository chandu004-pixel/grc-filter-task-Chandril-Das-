from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os

app = FastAPI(title="GRC Risk Assessment API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "risks.db"


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS risks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset TEXT NOT NULL,
            threat TEXT NOT NULL,
            likelihood INTEGER NOT NULL,
            impact INTEGER NOT NULL,
            score INTEGER NOT NULL,
            level TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


@app.on_event("startup")
def startup_event():
    init_db()


class RiskAssessment(BaseModel):
    asset: str
    threat: str
    likelihood: int
    impact: int


def calculate_risk_level(score):
    if 1 <= score <= 5:
        return "Low"
    elif 6 <= score <= 12:
        return "Medium"
    elif 13 <= score <= 18:
        return "High"
    elif 19 <= score <= 25:
        return "Critical"
    return "Unknown"


@app.post("/assess-risk")
def assess_risk(risk: RiskAssessment):
    if not (1 <= risk.likelihood <= 5) or not (1 <= risk.impact <= 5):
        raise HTTPException(
            status_code=400, detail="Invalid range: Likelihood and Impact must be 1–5."
        )

    score = risk.likelihood * risk.impact
    level = calculate_risk_level(score)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO risks (asset, threat, likelihood, impact, score, level) VALUES (?, ?, ?, ?, ?, ?)",
        (risk.asset, risk.threat, risk.likelihood, risk.impact, score, level),
    )
    conn.commit()
    risk_id = cursor.lastrowid
    conn.close()

    return {
        "id": risk_id,
        "asset": risk.asset,
        "threat": risk.threat,
        "likelihood": risk.likelihood,
        "impact": risk.impact,
        "score": score,
        "level": level,
    }


@app.get("/risks")
def get_risks(level: str = Query(None)):
    conn = get_db_connection()
    cursor = conn.cursor()

    if level:
        cursor.execute("SELECT * FROM risks WHERE level = ?", (level,))
    else:
        cursor.execute("SELECT * FROM risks")

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]


@app.delete("/risks/{risk_id}")
def delete_risk(risk_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM risks WHERE id = ?", (risk_id,))
    conn.commit()
    conn.close()
    return {"message": "Risk deleted successfully"}


@app.put("/risks/{risk_id}")
def update_risk(risk_id: int, risk: RiskAssessment):
    if not (1 <= risk.likelihood <= 5) or not (1 <= risk.impact <= 5):
        raise HTTPException(
            status_code=400, detail="Invalid range: Likelihood and Impact must be 1–5."
        )

    score = risk.likelihood * risk.impact
    level = calculate_risk_level(score)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE risks SET asset = ?, threat = ?, likelihood = ?, impact = ?, score = ?, level = ? WHERE id = ?",
        (risk.asset, risk.threat, risk.likelihood, risk.impact, score, level, risk_id),
    )
    conn.commit()
    conn.close()

    return {
        "id": risk_id,
        "asset": risk.asset,
        "threat": risk.threat,
        "likelihood": risk.likelihood,
        "impact": risk.impact,
        "score": score,
        "level": level,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
