import React, { useState } from 'react';

const Dashboard = ({ risks, onEdit, onDelete }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [filterLevel, setFilterLevel] = useState('All');

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return ' ↕';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedRisks = [...risks].sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredRisks = filterLevel === 'All'
        ? sortedRisks
        : sortedRisks.filter(r => r.level === filterLevel);

    const stats = {
        total: risks.length,
        highCritical: risks.filter(r => r.level === 'High' || r.level === 'Critical').length,
        avgScore: risks.length > 0 ? (risks.reduce((sum, r) => sum + r.score, 0) / risks.length).toFixed(1) : 0
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Asset', 'Threat', 'Likelihood', 'Impact', 'Score', 'Level'];
        const rows = filteredRisks.map((r, i) => [i + 1, r.asset, r.threat, r.likelihood, r.impact, r.score, r.level]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "risk_export.csv";
        link.click();
    };

    const handleDelete = async (dbId) => {
        // No window.confirm or alert to keep it snappy
        try {
            const response = await fetch(`http://localhost:8000/risks/${dbId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                onDelete(); // Refresh table immediately
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Risks</h3>
                    <p>{stats.total}</p>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#ef4444' }}>
                    <h3>High + Critical</h3>
                    <p>{stats.highCritical}</p>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#f97316' }}>
                    <h3>Average Score</h3>
                    <p>{stats.avgScore}</p>
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2>Manage Risks</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <select
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value)}
                            style={{ padding: '0.4rem', borderRadius: '4px', width: 'auto' }}
                        >
                            <option value="All">All Levels</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                        <button onClick={exportToCSV} className="secondary" style={{ width: 'auto', padding: '0.4rem 1rem' }}>
                            Export CSV
                        </button>
                    </div>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>ID{getSortIcon('id')}</th>
                                <th onClick={() => handleSort('asset')}>Asset{getSortIcon('asset')}</th>
                                <th onClick={() => handleSort('threat')}>Threat{getSortIcon('threat')}</th>
                                <th onClick={() => handleSort('likelihood')}>L{getSortIcon('likelihood')}</th>
                                <th onClick={() => handleSort('impact')}>I{getSortIcon('impact')}</th>
                                <th onClick={() => handleSort('score')}>Score{getSortIcon('score')}</th>
                                <th>Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRisks.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                        No risks assessed yet.
                                    </td>
                                </tr>
                            ) : (
                                filteredRisks.map((risk, index) => (
                                    <tr key={risk.id}>
                                        <td>{index + 1}</td>
                                        <td style={{ fontWeight: 600 }}>{risk.asset}</td>
                                        <td>{risk.threat}</td>
                                        <td>{risk.likelihood}</td>
                                        <td>{risk.impact}</td>
                                        <td style={{ fontWeight: 700 }}>{risk.score}</td>
                                        <td>
                                            <span className={`badge badge-${risk.level.toLowerCase()}`}>
                                                {risk.level}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => onEdit(risk)}
                                                    className="secondary"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: 'auto', minWidth: '40px' }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(risk.id)}
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: 'auto', background: '#ef4444', minWidth: '55px' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
