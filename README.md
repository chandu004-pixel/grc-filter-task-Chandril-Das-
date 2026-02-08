# GRC Risk Assessment Tool

A simple yet powerful web application for evaluating organizational risks using a Likelihood × Impact matrix, designed for Governance, Risk, and Compliance (GRC) use cases.

## Features

- **Risk Assessment Form**: Input asset details, threats, and estimate likelihood/impact.
- **Real-time Preview**: Instantly see the calculated Risk Score and Level before submitting.
- **Risk Heatmap**: A 5×5 visualization mapping Likelihood vs. Impact with severity-based coloring.
- **Dynamic Dashboard**: Sortable and filterable table of all recorded risks.
- **Summary Metrics**: Overview of total risks, high-priority counts, and average scores.
- **CSV Export**: Download the risk register for external reporting.
- **Mitigation Guidance**: Automated suggestions based on NIST-aligned risk levels.

## How Risk Scoring Works

This tool follows the standard **Likelihood × Impact** model:

1. **Likelihood (1–5)**: How probable is the threat event?
2. **Impact (1–5)**: How severe is the damage if the event occurs?
3. **Risk Score**: Likelihood × Impact (Range: 1–25)

### Risk Level Mapping
| Score Range | Level | Action/Mitigation |
|-------------|-------|-------------------|
| 1–5 | **Low** | Accept / Monitor |
| 6–12 | **Medium** | Plan mitigation within 6 months |
| 13–18 | **High** | Prioritize action + compensating controls |
| 19–25 | **Critical** | Immediate mitigation + executive reporting |

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLite (local `risks.db`)
- **Frontend**: React (JavaScript) + Vite
- **Styling**: Vanilla CSS (Custom Design System)

## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
The API will run on `http://localhost:8000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

## GRC Context & Decision Making

In a real-world GRC environment, risk assessments are the foundation of **Security Governance**. 
This tool supports the **NIST SP 800-30** framework for risk assessments by:
- Providing a structured way to identify and prioritize risks.
- Allowing decision-makers to visualize the "Risk Frontier" using the heatmap.
- Enabling resource allocation based on severity (Critical risks first).
- Supporting compliance audits by maintaining a persistent record (Risk Register).

## Assumptions and Limitations

- **No Authentication**: This is a simplified tool without user login.
- **Local Persistence**: Data is stored in a local SQLite file.
- **Fixed Matrix**: The 5x5 matrix is hardcoded as per standard GRC practices.
# grc-filter-task-Chandril-Das-
