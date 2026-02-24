// src/components/ProgramList.jsx
import React, { useState } from 'react';
import programsData from '../data/programs.json';
import ProgramCard from './ProgramCard';
import ProgramDetails from './ProgramDetails';
import './ProgramList.css';

function ProgramList() {

  // The program that is currently selected (for the modal)
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Search input value
  const [searchText, setSearchText] = useState('');

  // Filter dropdown values
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType,   setFilterType]   = useState('All');

  // --- Filtering logic ---
  const filteredPrograms = programsData.filter(program => {

    // Check if it matches the search text
    const matchesSearch =
      program.code.toLowerCase().includes(searchText.toLowerCase()) ||
      program.name.toLowerCase().includes(searchText.toLowerCase());

    // Check if it matches the status filter
    const matchesStatus =
      filterStatus === 'All' || program.status === filterStatus;

    // Check if it matches the type filter
    const matchesType =
      filterType === 'All' || program.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="program-list-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Program Offerings</h1>
          <p className="page-subtitle">
            {filteredPrograms.length} program(s) found
          </p>
        </div>
        <button className="add-btn">+ Add Program</button>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-bar">

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by code or name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Phased Out">Phased Out</option>
          <option value="Under Review">Under Review</option>
        </select>

        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Diploma">Diploma</option>
        </select>

      </div>

      {/* Program Cards Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="programs-grid">
          {filteredPrograms.map(program => (
            <ProgramCard
              key={program.id}
              program={program}
              onClick={setSelectedProgram}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>😕 No programs match your search or filters.</p>
          <button onClick={() => { setSearchText(''); setFilterStatus('All'); setFilterType('All'); }}>
            Clear Filters
          </button>
        </div>
      )}

      {/* Program Details Modal — only shows when a program is selected */}
      {selectedProgram && (
        <ProgramDetails
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}

    </div>
  );
}

export default ProgramList;