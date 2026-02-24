// src/components/ProgramDetails.jsx
import React, { useState } from 'react';
import subjectsData from '../data/subjects.json';
import './ProgramDetails.css';

function ProgramDetails({ program, onClose }) {

  // Which year level tab is currently selected
  const [activeYear, setActiveYear] = useState(1);

  // Get the subjects for the selected year level in this program
  const selectedYearLevel = program.yearLevels.find(yl => yl.year === activeYear);

  const subjectsForYear = selectedYearLevel
    ? subjectsData.filter(s =>
        selectedYearLevel.subjects.includes(s.code) && s.program === program.code
      )
    : [];

  return (
    // Clicking the dark overlay (backdrop) closes the modal
    <div className="modal-backdrop" onClick={onClose}>

      {/* Stop clicks inside the modal from closing it */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-code">{program.code}</span>
            <h2 className="modal-title">{program.name}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Program Info */}
        <div className="modal-info-grid">
          <div className="info-item">
            <span className="info-label">Type</span>
            <span className="info-value">{program.type}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Duration</span>
            <span className="info-value">{program.duration}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Units</span>
            <span className="info-value">{program.totalUnits}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className={`status-badge status-${program.status.toLowerCase().replace(' ', '-')}`}>
              {program.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="modal-description">
          <p className="info-label">Description</p>
          <p>{program.description}</p>
        </div>

        {/* Year Level Tabs */}
        <div className="year-tabs">
          {program.yearLevels.map(yl => (
            <button
              key={yl.year}
              className={`year-tab ${activeYear === yl.year ? 'active' : ''}`}
              onClick={() => setActiveYear(yl.year)}
            >
              {yl.label}
            </button>
          ))}
        </div>

        {/* Subjects for selected year */}
        <div className="subjects-table-container">
          {subjectsForYear.length > 0 ? (
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject Title</th>
                  <th>Units</th>
                  <th>Semester</th>
                  <th>Pre-requisites</th>
                </tr>
              </thead>
              <tbody>
                {subjectsForYear.map(subject => (
                  <tr key={subject.id}>
                    <td><span className="subject-code-tag">{subject.code}</span></td>
                    <td>{subject.title}</td>
                    <td>{subject.units}</td>
                    <td>{subject.semester}</td>
                    <td>
                      {subject.prerequisites.length > 0
                        ? subject.prerequisites.join(', ')
                        : 'None'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-subjects">No subject details available for this year level.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProgramDetails;