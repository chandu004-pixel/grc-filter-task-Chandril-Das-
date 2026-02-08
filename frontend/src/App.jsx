import React, { useState, useEffect } from 'react';
import RiskForm from './RiskForm';
import Dashboard from './Dashboard';
import Heatmap from './Heatmap';
import './index.css';

function App() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRisk, setEditingRisk] = useState(null);

  const fetchRisks = async () => {
    try {
      const response = await fetch('http://localhost:8000/risks');
      const data = await response.json();
      setRisks(data);
    } catch (err) {
      console.error('Failed to fetch risks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRisks();
  }, []);

  const handleEdit = (risk) => {
    setEditingRisk(risk);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingRisk(null);
  };

  return (
    <div className="container">
      <header>
        <h1>GRC Risk Assessment Tool</h1>
        <p className="subtitle">Identify, evaluate, and prioritize organizational risks</p>
      </header>

      <div className="grid">
        <aside>
          <RiskForm
            onRiskAdded={fetchRisks}
            editData={editingRisk}
            onCancelEdit={handleCancelEdit}
          />
          <div style={{ marginTop: '2rem' }}>
            <Heatmap risks={risks} />
          </div>
        </aside>

        <main>
          {loading ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Loading risk data...</p>
            </div>
          ) : (
            <Dashboard
              risks={risks}
              onEdit={handleEdit}
              onDelete={fetchRisks}
            />
          )}
        </main>
      </div>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem', paddingBottom: '2rem' }}>
        &copy; 2026 GRC Solution | Aligned with NIST SP 800-30
      </footer>
    </div>
  );
}

export default App;
