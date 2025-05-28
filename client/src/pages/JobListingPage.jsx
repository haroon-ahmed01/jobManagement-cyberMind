import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';
import JobListingGrid from '../components/JobListingGrid';
import Navbar from '../components/Navbar'; 
import './JobListingPage.css';

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: '',
    salaryMin: "10000",
    salaryMax: "120000",
  });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationDropdownRef = useRef(null); // Create a ref for the location dropdown

  const navigate = useNavigate();

  // Major Indian IT hubs
  const locations = [
    'Bangalore',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Delhi NCR',
    'Mumbai',
    'Gurgaon',
    'Noida',
    'Ahmedabad',
    'Kolkata'
  ];

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleSalaryChange = (type, value) => {
    const numValue = parseInt(value);
    setFilters({ ...filters, [type]: numValue });
  };

  const formatSalary = (amount) => {
    if (amount === 0) return '₹0k';
    return `₹${(amount / 1000)}k`;
  };

  const toggleLocationDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowLocationDropdown(!showLocationDropdown);
  };

  const selectLocation = (location) => {
    setFilters({ ...filters, location });
    setShowLocationDropdown(false);
  };

  return (
    <div className="job-listing-page job-listing-container">
      <Navbar />

      <div className="filter-container">
        <div className="filter-section">
          <div className="filter-icon-wrapper">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M8.11111 15.2222C12.0385 15.2222 15.2222 12.0385 15.2222 8.11111C15.2222 4.18375 12.0385 1 8.11111 1C4.18375 1 1 4.18375 1 8.11111C1 12.0385 4.18375 15.2222 8.11111 15.2222Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 17L13.1333 13.1333" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Search By Job Title, Role"
            value={filters.title}
            onChange={handleInputChange}
            className="filter-input"
          />
        </div>

        <div className="filter-divider"></div>

        <div className="filter-section location-filter" ref={locationDropdownRef}>
          <div 
            className="filter-icon-wrapper"
            onClick={toggleLocationDropdown}
          >
            <svg width="16" height="21" viewBox="0 0 16 21" fill="none">
              <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 1C12.4183 1 16 4.58172 16 9C16 14 8 20 8 20C8 20 0 14 0 9C0 4.58172 3.58172 1 8 1Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            name="location"
            placeholder="Preferred Location"
            value={filters.location}
            onChange={handleInputChange}
            className="filter-input"
            readOnly
            onClick={toggleLocationDropdown}
          />
          <div 
            className="filter-down-arrow"
            onClick={toggleLocationDropdown}
          >
            <svg width="10" height="4" viewBox="0 0 10 4" fill="none">
              <path d="M1 1L5 3L9 1" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {showLocationDropdown && (
            <div className="location-dropdown">
              {locations.map((location) => (
                <div 
                  key={location} 
                  className="dropdown-item"
                  onClick={() => selectLocation(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="filter-divider"></div>

        <div className="filter-section">
          <div className="filter-icon-wrapper">
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
              <path d="M16 4H12L10 2H6L4 4H0V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V6C18 5.46957 17.7893 4.96086 17.4142 4.58579C17.0391 4.21071 16.5304 4 16 4Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="">Job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <div className="filter-down-arrow">
            <svg width="10" height="4" viewBox="0 0 10 4" fill="none">
              <path d="M1 1L5 3L9 1" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="filter-divider"></div>

        <div className="salary-container">
          <div className="salary-header">
            <span className="salary-label">Salary Per Month</span>
            <span className="salary-value">
              {`${formatSalary(filters.salaryMin)} - ${formatSalary(filters.salaryMax)}`}
            </span>
          </div>
          <div className="slider-container">
            <div className="slider-track">
              <div 
                className="slider-active-track"
                style={{
                  left: `${Math.min(((filters.salaryMin - 10000) / (200000 - 10000)) * 100, ((filters.salaryMax - 10000) / (200000 - 10000)) * 100)}%`,
                  width: `${Math.abs(((filters.salaryMax - filters.salaryMin) / (200000 - 10000)) * 100)}%`
                }}
              ></div>
            </div>
            
            {/* Min Range Input */}
            <input
              type="range"
              min="10000"
              max="200000"
              step="1000"
              value={filters.salaryMin}
              onChange={(e) => handleSalaryChange('salaryMin', e.target.value)}
              className="slider-input"
            />
            
            {/* Max Range Input */}
            <input
              type="range"
              min="10000"
              max="200000"
              step="1000"
              value={filters.salaryMax}
              onChange={(e) => handleSalaryChange('salaryMax', e.target.value)}
              className="slider-input"
            />
          </div>
        </div>
      </div>

      {/* Job Listing Grid */}
      <div className="job-listing-page-content">
        <JobListingGrid jobs={jobs} />
      </div>
    </div>
  );
};

export default JobListingPage;