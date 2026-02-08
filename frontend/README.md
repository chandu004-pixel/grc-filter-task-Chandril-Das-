# 🛡️ GRC Risk Assessment - Frontend

This is the React-based frontend for the GRC Risk Assessment Tool.

## 🚀 Key Features
- **Interactive Risk Form**: Real-time score calculation and severity preview.
- **Dynamic Dashboard**: Sortable, filterable risk register with sequential IDs.
- **Risk Heatmap**: 5x5 visualizer (Likelihood vs. Impact) with interactive tooltips.
- **CSV Export**: Download current risk data for external reporting.
- **Responsive Design**: Clean, modern UI that works on multiple screen sizes.

## 🛠️ Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Standard Unicode Support

## 🏃 How to Run Locally
1. Ensure the **Backend** is running at `http://localhost:8000`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to: `http://localhost:5173`.

## 📂 Component Structure
- `App.jsx`: Main orchestration and state management.
- `RiskForm.jsx`: Handles data entry and real-time validation.
- `Dashboard.jsx`: Displays the risk register and management actions (Edit/Delete).
- `Heatmap.jsx`: Visualizes risk distribution on a color-coded grid.
- `index.css`: Contains the global design system, color tokens, and layout styles.

---
*Developed for the GRC Risk Assessment Assignment.*
