// src/components/SubjectCard.jsx
import React from 'react';
import './SubjectCard.css';

function SubjectCard({ subject, onClick }) {
  return (
    <div className="subject-card" onClick={() => onClick(subject)}>

      {/* Top row: code + term badge */}
      <div className="subject-card-top">
        <span className="subject-code">{subject.code}</span>
        <span className={`term-badge term-${subject.term.toLowerCase().replace(/\s+/g, '-')}`}>
          {subject.term}
        </span>
      </div>

      {/* Subject title */}
      <h3 className="subject-title">{subject.title}</h3>

      {/* Details */}
      <div className="subject-meta">
        <span className="meta-item">📅 {subject.semester}</span>
        <span className="meta-item">⚖️ {subject.units} units</span>
        <span className="meta-item">🎓 {subject.program}</span>
      </div>

      {/* Pre-requisites indicator */}
      <div className="prereq-indicator">
        {subject.prerequisites.length > 0 ? (
          <span className="has-prereq">🔗 Has pre-requisites</span>
        ) : (
          <span className="no-prereq">✅ No pre-requisites</span>
        )}
      </div>

    </div>
  );
}

export default SubjectCard;