// src/components/Dashboard.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import programsData from '../data/programs.json';
import subjectsData from '../data/subjects.json';
import './Dashboard.css';

// Colors for the pie chart slices
const PIE_COLORS = ['#1e3a5f', '#f0ad4e', '#d9534f', '#5cb85c'];

function Dashboard() {

  // --- Calculate stats from mock data ---

  const totalPrograms = programsData.length;
  const totalSubjects = subjectsData.length;

  // Count programs by status
  const activePrograms     = programsData.filter(p => p.status === 'Active').length;
  const phasedOut          = programsData.filter(p => p.status === 'Phased Out').length;
  const underReview        = programsData.filter(p => p.status === 'Under Review').length;

  // Count subjects that have at least one prerequisite
  const subjectsWithPrereqs = subjectsData.filter(s => s.prerequisites.length > 0).length;

  // Count subjects per semester for the bar chart
  const semesterCounts = subjectsData.reduce((acc, subject) => {
    const sem = subject.semester;
    acc[sem] = (acc[sem] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.keys(semesterCounts).map(key => ({
    semester: key,
    count: semesterCounts[key]
  }));

  // Data for the pie chart (program status breakdown)
  const pieChartData = [
    { name: 'Active',       value: activePrograms },
    { name: 'Under Review', value: underReview },
    { name: 'Phased Out',   value: phasedOut },
  ].filter(item => item.value > 0);

  // Recently added: last 3 programs (sorted by dateAdded descending)
  const recentPrograms = [...programsData]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 3);

  return (
    <div className="dashboard">

      {/* Page title */}
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Overview of all programs and subjects</p>

      {/* --- Stat Cards Row --- */}
      <div className="stats-grid">

        <div className="stat-card blue">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <p className="stat-number">{totalPrograms}</p>
            <p className="stat-label">Total Programs</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <p className="stat-number">{totalSubjects}</p>
            <p className="stat-label">Total Subjects</p>
          </div>
        </div>

        <div className="stat-card teal">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p className="stat-number">{activePrograms}</p>
            <p className="stat-label">Active Programs</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">🔗</div>
          <div className="stat-info">
            <p className="stat-number">{subjectsWithPrereqs}</p>
            <p className="stat-label">Subjects with Pre-requisites</p>
          </div>
        </div>

      </div>

      {/* --- Charts Row --- */}
      <div className="charts-grid">

        {/* Bar Chart: Subjects per Semester */}
        <div className="chart-card">
          <h2 className="chart-title">Subjects per Semester</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Program Status */}
        <div className="chart-card">
          <h2 className="chart-title">Program Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* --- Recently Added Programs --- */}
      <div className="recent-section">
        <h2 className="section-title">Recently Added Programs</h2>
        <div className="recent-list">
          {recentPrograms.map(program => (
            <div key={program.id} className="recent-card">
              <div className="recent-code">{program.code}</div>
              <div className="recent-info">
                <p className="recent-name">{program.name}</p>
                <p className="recent-date">Added: {program.dateAdded}</p>
              </div>
              <span className={`status-badge status-${program.status.toLowerCase().replace(' ', '-')}`}>
                {program.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;