# 🛡️ GRC Risk Assessment Tool

## Overview
This project is a full-stack Risk Assessment Tool built as part of the assignment to demonstrate a practical Governance, Risk, and Compliance (GRC) use case.
The application allows users to identify risks, calculate risk scores, classify risk levels, and visualize risks using a dashboard and a risk heatmap to support data-driven decision making.

The focus of this project is correct risk logic, clean implementation, and usability, rather than advanced UI or over-engineered architecture.

## Problem Statement
Organizations face multiple risks related to assets, threats, and vulnerabilities.
This tool helps:
- Assess risks using Likelihood × Impact
- Categorize risks into severity levels
- Maintain a risk register
- Visualize risk concentration using a heatmap

This aligns with standard GRC practices such as risk identification, assessment, monitoring, and reporting.

## Technology Stack
The project intentionally uses simple, user-friendly technologies:
- **Backend**: FastAPI (Python)
- **Database**: SQLite (local, file-based)
- **Frontend**: React (JavaScript)
- **Communication**: REST APIs (JSON)

These technologies were chosen for clarity, ease of understanding, and rapid development.

## Functional Features (As per Assignment)

### 1. Risk Input & Assessment
Users can input:
- Asset Name
- Threat Description
- Likelihood (1–5)
- Impact (1–5)

The system:
- Validates Likelihood and Impact values
- Calculates **Risk Score = Likelihood × Impact**
- Displays a real-time preview of:
  - Risk Score
  - Risk Level

### 2. Risk Classification
Risk levels are categorized as:

| Score Range | Risk Level |
| :--- | :--- |
| 1 – 5 | Low |
| 6 – 12 | Medium |
| 13 – 18 | High |
| 19 – 25 | Critical |

This classification is applied consistently across the dashboard and heatmap.

### 3. Backend APIs
The FastAPI backend provides APIs to:
- Submit a new risk assessment
- Retrieve all risk records
- Filter risks by risk level

Each stored risk includes: Asset, Threat, Likelihood, Impact, Risk Score, and Risk Level. Data is stored persistently using SQLite.

### 4. Risk Dashboard
The dashboard provides:
- A Risk Register table showing all assessed risks
- Columns: ID, Asset, Threat, Likelihood, Impact, Score, Level
- Sorting by score
- Filtering by risk level
- Actions such as edit and delete

This allows continuous monitoring and management of risks.

### 5. Risk Summary Metrics
At the top of the dashboard, the application displays:
- Total number of risks
- Count of High + Critical risks
- Average risk score

These metrics provide a quick overview of the organization’s overall risk posture.

### 6. Risk Heatmap Visualization
A 5 × 5 Risk Heatmap is implemented to visually represent risk concentration.
- **X-axis**: Impact (1 → 5)
- **Y-axis**: Likelihood (5 → 1)
- Each cell represents a Likelihood–Impact combination
- Cells display the count of risks
- Color-coded based on severity:
  - Green → Low
  - Yellow → Medium
  - Orange → High
  - Red → Critical

The heatmap helps identify high-risk areas that require immediate attention.

## Project Structure
```text
project-root/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── risks.db
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── RiskForm.jsx
│   │   ├── Dashboard.jsx
│   │   └── Heatmap.jsx
│   └── package.json
└── README.md
```

## How to Run the Project

### Backend
```bash
cd backend
pip install -r requirements.txt
python3 app.py
```
Backend runs on: `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## Assumptions & Limitations
- The application is intended to be run locally as per assignment requirements. Deployment was not required.
- No authentication or user roles are implemented
- SQLite is used for simplicity and local storage
- The application is intended for demonstration purposes, not production use
- UI focuses on clarity over design aesthetics

## GRC Relevance
This tool aligns with GRC principles by:
- Identifying and assessing risks
- Maintaining a structured risk register
- Supporting monitoring through dashboards
- Enabling informed decision-making via visual analysis

## Conclusion
The Risk Assessment Tool successfully fulfills all assignment deliverables by providing:
- Correct risk calculations
- Persistent data storage
- A functional dashboard
- Visual risk analysis through a heatmap

The project demonstrates a practical understanding of risk modeling, full-stack development, and data-driven decision support.
