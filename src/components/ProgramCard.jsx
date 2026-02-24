// src/components/ProgramCard.jsx
import React from 'react';
import './ProgramCard.css';

function ProgramCard({ program, onClick }) {
  return (
    <div className="program-card" onClick={() => onClick(program)}>

      {/* Card header with program code and status */}
      <div className="card-header">
        <span className="program-code">{program.code}</span>
        <span className={`status-badge status-${program.status.toLowerCase().replace(' ', '-')}`}>
          {program.status}
        </span>
      </div>

      {/* Program name */}
      <h3 className="program-name">{program.name}</h3>

      {/* Program details row */}
      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Type</span>
          <span className="detail-value">{program.type}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Duration</span>
          <span className="detail-value">{program.duration}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Total Units</span>
          <span className="detail-value">{program.totalUnits}</span>
        </div>
      </div>

      {/* Click to view prompt */}
      <p className="card-cta">Click to view details →</p>

    </div>
  );
}

export default ProgramCard;