import React from "react";
import './JobListingGrid.css';

const JobCard = ({ job }) => {
  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : job.requirements?.split('\n') || [];

  const formatTimeAgo = (date) => {
    const now = new Date();
    const jobDate = new Date(date || Date.now());
    const diffInHours = Math.floor((now - jobDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h Ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d Ago`;
  };

  const getCompanyLogo = (company) => {
    const logos = {
      'Amazon': '🏪',
      'Tesla': '🚗', 
      'Swiggy': '🍔',
      'Microsoft': '💻',
      'Google': '🔍',
      'Apple': '🍎',
      'Meta': '👥',
      'Netflix': '🎬'
    };
    return logos[company] || '🏢';
  };

  const formatSalary = (salary) => {
    if (!salary) return '12LPA';
  
    const toLPA = (value) => {
      const annualSalary = value * 12;
      const lpa = annualSalary / 100000;
      return lpa % 1 === 0 ? `${lpa}LPA` : `${lpa.toFixed(1)}LPA`;
    };
  
    if (typeof salary === 'string' && salary.includes('-')) {
      const [minStr, maxStr] = salary.split('-').map(s => parseFloat(s.trim()));
      if (!isNaN(minStr) && !isNaN(maxStr)) {
        const higherValue = Math.max(minStr, maxStr);
        return toLPA(higherValue);
      }
    }
  
    if (typeof salary === 'number') {
      return toLPA(salary);
    }
  
    if (typeof salary === 'object' && (salary.min || salary.max)) {
      const higherValue = Math.max(salary.min || 0, salary.max || 0);
      return toLPA(higherValue);
    }
  
    if (typeof salary === 'string' && salary.includes('LPA')) {
      return salary;
    }
  
    return '12LPA';
  };

  const getDescriptionPoints = (description) => {
    const defaultPoints = [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized"
    ];
    
    if (!description) return defaultPoints;
    
    // Extract first two sentences
    const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const points = sentences.slice(0, 2).map(s => s.trim());
    
    // Fill with defaults if needed
    return [
      points[0] || defaultPoints[0],
      points[1] || defaultPoints[1]
    ];
  };

  return (
    <div className="job-card">
      <div className="job-card-time-badge">
        {formatTimeAgo(job.createdAt)}
      </div>

      <div className="job-card-company-logo">
        <div className="job-card-company-logo-inner">
          {getCompanyLogo(job.company)}
        </div>
      </div>

      <div className="job-card-title">
        <h3>{job.title}</h3>
      </div>

      <div className="job-card-details">
        <div className="job-card-detail-item">
          <svg width="17.1" height="13.5" viewBox="0 0 18 14" fill="none">
            <path d="M1 13V11C1 9.9 1.4 8.95833 2.2 8.175C3 7.39167 3.93333 7 5 7H13C14.0667 7 15 7.39167 15.8 8.175C16.6 8.95833 17 9.9 17 11V13M5 3C5.55 3 6.02083 3.19583 6.4125 3.5875C6.80417 3.97917 7 4.45 7 5C7 5.55 6.80417 6.02083 6.4125 6.4125C6.02083 6.80417 5.55 7 5 7C4.45 7 3.97917 6.80417 3.5875 6.4125C3.19583 6.02083 3 5.55 3 5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3ZM13 3C13.55 3 14.0208 3.19583 14.4125 3.5875C14.8042 3.97917 15 4.45 15 5C15 5.55 14.8042 6.02083 14.4125 6.4125C14.0208 6.80417 13.55 7 13 7C12.45 7 11.9792 6.80417 11.5875 6.4125C11.1958 6.02083 11 5.55 11 5C11 4.45 11.1958 3.97917 11.5875 3.5875C11.9792 3.19583 12.45 3 13 3Z" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
          </svg>
          <span className="job-card-detail-experience">
            {job.experience?.min || 1}-{job.experience?.max || 3} yr Exp
          </span>
        </div>

        <div className="job-card-detail-item">
          <svg width="19" height="16.41" viewBox="0 0 20 17" fill="none">
            <path d="M2 15V3C2 2.45 2.19583 1.97917 2.5875 1.5875C2.97917 1.19583 3.45 1 4 1H16C16.55 1 17.0208 1.19583 17.4125 1.5875C17.8042 1.97917 18 2.45 18 3V15L14 13L10 15L6 13L2 15Z" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
          </svg>
          <span className="job-card-detail-worktype">
            {job.workType || 'Onsite'}
          </span>
        </div>

        <div className="job-card-detail-item">
        <svg width="18.18" height="20" viewBox="0 0 19 21" fill="none">
  <rect x="4" y="11" width="11" height="5" rx="0.5" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
  <rect x="4" y="8" width="11" height="5" rx="0.5" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
  <rect x="4" y="5" width="11" height="5" rx="0.5" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
  <rect x="4" y="2" width="11" height="5" rx="0.5" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
</svg>
          <span className="job-card-detail-salary">{formatSalary(job.salary)}</span>
        </div>
      </div>

      <div className="job-card-description">
      <ul className="job-card-description-list">
          {getDescriptionPoints(job.description).map((point, index) => (
            <li key={index} className="job-card-description-item">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="job-card-apply-button-container">
        <button 
          className="job-card-apply-button"
          onClick={() => console.log('Apply clicked for:', job.title)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

const JobListingGrid = ({ jobs = [] }) => {
  const sampleJobs = [
    // Your sample jobs here if needed
  ];

  const displayJobs = jobs.length > 0 ? jobs : sampleJobs;

  return (
    <div className="job-listing-grid-container">
      <div className="job-listing-grid-wrapper">
        <div className="job-listing-grid">
          {displayJobs.length === 0 ? (
            <div className="job-listing-no-jobs">
              <p>No jobs found.</p>
            </div>
          ) : (
            displayJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingGrid;