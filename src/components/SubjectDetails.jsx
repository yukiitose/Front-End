// src/components/SubjectDetails.jsx
import React from 'react';
import './SubjectDetails.css';

function SubjectDetails({ subject, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box subject-modal" onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-code">{subject.code}</span>
            <h2 className="modal-title">{subject.title}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Info Grid */}
        <div className="modal-info-grid">
          <div className="info-item">
            <span className="info-label">Units</span>
            <span className="info-value">{subject.units}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Semester</span>
            <span className="info-value">{subject.semester}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Term Type</span>
            <span className={`term-badge term-${subject.term.toLowerCase().replace(/\s+/g, '-')}`}>
              {subject.term}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Program</span>
            <span className="info-value">{subject.program}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Year Level</span>
            <span className="info-value">Year {subject.yearLevel}</span>
          </div>
        </div>

        {/* Description */}
        <div className="subject-detail-section">
          <p className="info-label">Description</p>
          <p className="detail-text">{subject.description}</p>
        </div>

        {/* Pre-requisites */}
        <div className="subject-detail-section">
          <p className="info-label">Pre-requisites</p>
          {subject.prerequisites.length > 0 ? (
            <div className="tag-list">
              {subject.prerequisites.map(pre => (
                <span key={pre} className="subject-tag prereq-tag">{pre}</span>
              ))}
            </div>
          ) : (
            <p className="none-text">None</p>
          )}
        </div>

        {/* Co-requisites */}
        <div className="subject-detail-section">
          <p className="info-label">Co-requisites</p>
          {subject.corequisites.length > 0 ? (
            <div className="tag-list">
              {subject.corequisites.map(co => (
                <span key={co} className="subject-tag coreq-tag">{co}</span>
              ))}
            </div>
          ) : (
            <p className="none-text">None</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default SubjectDetails;