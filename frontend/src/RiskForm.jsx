import React, { useState, useEffect } from 'react';

const RiskForm = ({ onRiskAdded, editData, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        asset: '',
        threat: '',
        likelihood: 3,
        impact: 3
    });

    const [preview, setPreview] = useState({ score: 9, level: 'Medium' });

    useEffect(() => {
        if (editData) {
            setFormData({
                asset: editData.asset,
                threat: editData.threat,
                likelihood: editData.likelihood,
                impact: editData.impact
            });
        } else {
            setFormData({ asset: '', threat: '', likelihood: 3, impact: 3 });
        }
    }, [editData]);

    const calculateRisk = (l, i) => {
        const score = l * i;
        let level = 'Low';
        if (score >= 19) level = 'Critical';
        else if (score >= 13) level = 'High';
        else if (score >= 6) level = 'Medium';
        return { score, level };
    };

    useEffect(() => {
        setPreview(calculateRisk(formData.likelihood, formData.impact));
    }, [formData.likelihood, formData.impact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'likelihood' || name === 'impact' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editData
            ? `http://localhost:8000/risks/${editData.id}`
            : 'http://localhost:8000/assess-risk';
        const method = editData ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert(editData ? 'Risk updated successfully!' : 'Risk added successfully!');
                if (!editData) {
                    setFormData({ asset: '', threat: '', likelihood: 3, impact: 3 });
                }
                onRiskAdded();
                if (onCancelEdit) onCancelEdit();
            } else {
                const error = await response.json();
                alert(`Error: ${error.detail}`);
            }
        } catch (err) {
            alert('Failed to connect to backend.');
        }
    };

    return (
        <div className="card" style={{ border: editData ? '2px solid var(--primary)' : '1px solid var(--border)' }}>
            <h2>{editData ? 'Edit Risk Record' : 'Assess New Risk'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Asset Name</label>
                    <input
                        type="text"
                        name="asset"
                        value={formData.asset}
                        onChange={handleChange}
                        placeholder="e.g. Customer Database"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Threat Description</label>
                    <textarea
                        name="threat"
                        value={formData.threat}
                        onChange={handleChange}
                        placeholder="e.g. Unauthorized Access"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Likelihood (1-5)</label>
                    <div className="range-container">
                        <input
                            type="range"
                            name="likelihood"
                            min="1"
                            max="5"
                            value={formData.likelihood}
                            onChange={handleChange}
                        />
                        <span className="range-value">{formData.likelihood}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Impact (1-5)</label>
                    <div className="range-container">
                        <input
                            type="range"
                            name="impact"
                            min="1"
                            max="5"
                            value={formData.impact}
                            onChange={handleChange}
                        />
                        <span className="range-value">{formData.impact}</span>
                    </div>
                </div>

                <div className={`preview-box preview-${preview.level.toLowerCase()}`}>
                    {editData ? 'Updated: ' : 'Preview: '} Score {preview.score} | Level {preview.level}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <button type="submit" style={{ flex: 1 }}>
                        {editData ? 'Save Changes' : 'Submit Assessment'}
                    </button>
                    {editData && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="secondary"
                            style={{ flex: 0.5 }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RiskForm;
