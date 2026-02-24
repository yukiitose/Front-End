// src/components/SubjectList.jsx
import React, { useState } from 'react';
import subjectsData from '../data/subjects.json';
import SubjectCard from './SubjectCard';
import SubjectDetails from './SubjectDetails';
import './SubjectList.css';

function SubjectList() {

  // Selected subject for the modal
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Search and filter state
  const [searchText,      setSearchText]      = useState('');
  const [filterSemester,  setFilterSemester]  = useState('All');
  const [filterProgram,   setFilterProgram]   = useState('All');
  const [filterPrereq,    setFilterPrereq]    = useState('All');

  // Get unique programs for the filter dropdown
  const allPrograms = [...new Set(subjectsData.map(s => s.program))];

  // --- Filtering logic ---
  const filteredSubjects = subjectsData.filter(subject => {

    const matchesSearch =
      subject.code.toLowerCase().includes(searchText.toLowerCase()) ||
      subject.title.toLowerCase().includes(searchText.toLowerCase());

    const matchesSemester =
      filterSemester === 'All' || subject.semester === filterSemester;

    const matchesProgram =
      filterProgram === 'All' || subject.program === filterProgram;

    const matchesPrereq =
      filterPrereq === 'All' ||
      (filterPrereq === 'With' && subject.prerequisites.length > 0) ||
      (filterPrereq === 'Without' && subject.prerequisites.length === 0);

    return matchesSearch && matchesSemester && matchesProgram && matchesPrereq;
  });

  // Clear all filters
  function clearFilters() {
    setSearchText('');
    setFilterSemester('All');
    setFilterProgram('All');
    setFilterPrereq('All');
  }

  return (
    <div className="subject-list-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Subject Offerings</h1>
          <p className="page-subtitle">{filteredSubjects.length} subject(s) found</p>
        </div>
        <button className="add-btn">+ Add Subject</button>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-bar">

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by code or title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select className="filter-select" value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)}>
          <option value="All">All Semesters</option>
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
        </select>

        <select className="filter-select" value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)}>
          <option value="All">All Programs</option>
          {allPrograms.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select className="filter-select" value={filterPrereq} onChange={(e) => setFilterPrereq(e.target.value)}>
          <option value="All">All Subjects</option>
          <option value="With">With Pre-requisites</option>
          <option value="Without">Without Pre-requisites</option>
        </select>

        {/* Clear filters button — only show if a filter is active */}
        {(searchText || filterSemester !== 'All' || filterProgram !== 'All' || filterPrereq !== 'All') && (
          <button className="clear-btn" onClick={clearFilters}>
            ✕ Clear
          </button>
        )}

      </div>

      {/* Subject Cards Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="subjects-grid">
          {filteredSubjects.map(subject => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={setSelectedSubject}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>😕 No subjects match your search or filters.</p>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      )}

      {/* Subject Details Modal */}
      {selectedSubject && (
        <SubjectDetails
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}

    </div>
  );
}

export default SubjectList;