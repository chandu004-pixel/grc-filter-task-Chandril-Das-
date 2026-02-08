import React from 'react';

const Heatmap = ({ risks }) => {
    const likelihoodLevels = [5, 4, 3, 2, 1];
    const impactLevels = [1, 2, 3, 4, 5];

    const getCellColor = (likelihood, impact) => {
        const score = likelihood * impact;
        if (score >= 19) return '#ef4444'; // Critical
        if (score >= 13) return '#f97316'; // High
        if (score >= 6) return '#eab308'; // Medium
        return '#22c55e'; // Low
    };

    return (
        <div className="card">
            <h2 style={{ marginBottom: '1rem' }}>Risk Heatmap</h2>

            <div className="heatmap-wrapper">
                <div className="impact-header-label">Impact (1 → 5)</div>

                <div className="heatmap-main-area">
                    <div className="likelihood-side-label">Likelihood (1 → 5)</div>

                    <div className="heatmap-grid-new">
                        {/* Header row with Impact numbers */}
                        <div className="grid-label-spacer"></div>
                        {impactLevels.map(i => (
                            <div key={`header-${i}`} className="grid-header-num">{i}</div>
                        ))}

                        {/* Data rows */}
                        {likelihoodLevels.map(l => (
                            <React.Fragment key={`row-${l}`}>
                                <div className="grid-side-num">{l}</div>
                                {impactLevels.map(i => {
                                    const matchingRisks = risks.filter(r => r.likelihood === l && r.impact === i);
                                    const count = matchingRisks.length;
                                    const assets = matchingRisks.map(r => r.asset).join(', ');
                                    const tooltipText = `${count} risk${count !== 1 ? 's' : ''} here: ${assets}`;

                                    return (
                                        <div
                                            key={`${l}-${i}`}
                                            className="heatmap-cell"
                                            title={count > 0 ? tooltipText : ''}
                                            style={{
                                                backgroundColor: getCellColor(l, i),
                                                color: (l * i >= 6 && l * i < 13) ? 'black' : 'white'
                                            }}
                                        >
                                            {count > 0 ? count : ''}
                                            {count > 0 && <div className="tooltip">{tooltipText}</div>}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '1.5rem' }}>
                Numbers represent count of risks in each cell. Hover for details.
            </div>
        </div>
    );
};

export default Heatmap;
