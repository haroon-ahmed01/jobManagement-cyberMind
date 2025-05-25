import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import jobService from '../services/jobService';

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
      <div className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo"></div>
          <a href="/" className="navbar-title">Job Portal</a>
        </div>
        <nav className="navbar-nav">
          <a href="/" className="navbar-link">Home</a>
          <a href="/find-jobs" className="navbar-link">Find Jobs</a>
          <a href="/find-talents" className="navbar-link">Find Talents</a>
          <a href="/about-us" className="navbar-link">About us</a>
          <a href="/testimonials" className="navbar-link">Testimonials</a>
          <button className="create-job-btn" onClick={() => navigate('/create-job')}>
            Create Jobs
          </button>
        </nav>
      </div>

      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Find Your Dream Job</h1>
          <button
            onClick={() => navigate('/create-job')}
            className="create-job-btn"
          >
            + Create Job
          </button>
        </div>

        {/* Search and Filters Section */}
        <div className="search-section">
          <div className="search-grid">
            <div className="search-input">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search By Job Title, Role"
                name="title"
                value={filters.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="filter-dropdown">
              <select
                name="location"
                value={filters.location}
                onChange={handleInputChange}
              >
                <option value="">Preferred Location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div className="filter-dropdown">
              <select
                name="type"
                value={filters.type}
                onChange={handleInputChange}
              >
                <option value="">Job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div className="salary-range mt-4">
            <span>Salary Per Month</span>
            <div className="salary-slider">
              <input
                type="range"
                min="0"
                max="100"
                className="slider"
              />
            </div>
            <span>₹50k - ₹80k</span>
          </div>

          {/* Additional Filters */}
          <div className="search-grid mt-4">
            <input
              type="number"
              placeholder="Min Salary"
              name="salaryMin"
              value={filters.salaryMin}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="number" 
              placeholder="Max Salary"
              name="salaryMax"
              value={filters.salaryMax}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="jobs-grid">
          {jobs.length === 0 ? (
            <div className="text-center">
              <p>No jobs found.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingPage;