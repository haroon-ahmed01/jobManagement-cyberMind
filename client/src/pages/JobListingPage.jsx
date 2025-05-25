import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobService from '../services/jobService'; // Assumes jobService.getJobs(filters) is defined
import JobListingGrid from '../components/JobListingGrid'; // Assumes it accepts a jobs prop

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: '',
    salaryMin: '',
    salaryMax: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getJobs(filters);
      setJobs(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={{ padding: '20px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <a href="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>Job Portal</a> {/* cyberWork-mind-LOGO */}
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/">Home</a>
          <a href="/find-jobs">Find Jobs</a>
          <a href="/find-talents">Find Talents</a>
          <a href="/about-us">About Us</a>
          <a href="/testimonials">Testimonials</a>
          <button onClick={() => navigate('/create-job')} style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', borderRadius: '6px' }}>Create Jobs</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '24px 32px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        margin: '40px auto',
        maxWidth: '1400px',
        border: '1px solid #f1f5f9'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
          gap: '16px',
        }}>
          <input
            type="text"
            name="title"
            placeholder="Search Job Title"
            value={filters.title}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <input
            type="number"
            name="salaryMin"
            placeholder="Min Salary"
            value={filters.salaryMin}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="salaryMax"
            placeholder="Max Salary"
            value={filters.salaryMax}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Job Listing Grid */}
      <div style={{ padding: '0 40px 60px' }}>
        <JobListingGrid jobs={jobs} />
      </div>
    </div>
  );
};

// 🔧 Common input styling
const inputStyle = {
  padding: '12px 16px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  outline: 'none',
  width: '100%',
};

export default JobListingPage;
