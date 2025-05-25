import React from "react";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({ job }) => {
  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : job.requirements?.split('\n') || [];

  return (
    <div className="job-card">
      <div className="job-card-header">
        <img
          src={job.logo || job.logoUrl || 'https://via.placeholder.com/48x48/333/fff?text=A'}
          alt="Company Logo"
          className="company-logo"
        />
        <div className="job-info">
          <h3>{job.title}</h3>
          <div className="company-name">{job.company}</div>
        </div>
        <div className="time-badge">
          {formatDistanceToNow(new Date(job.createdAt || Date.now()), { addSuffix: true })}
        </div>
      </div>

      <div className="job-meta">
        <span>👥 {job.experience?.min || 1}-{job.experience?.max || 3} yr Exp</span>
        <span>🏢 Onsite</span>
        <span>💰 {job.salary?.min || 12}LPA</span>
      </div>

      <div className="job-details">
        <div className="job-detail-item">
          <span className="job-detail-icon">📍</span>
          <strong>Location:</strong> {job.location}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-icon">💼</span>
          <strong>Type:</strong> {job.type}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-icon">💵</span>
          <strong>Salary:</strong> ₹{job.salary?.min || 0} - ₹{job.salary?.max || 0} LPA
        </div>
      </div>

      <div className="job-description">
        <p>• A user-friendly interface lets you browse stunning photos and videos</p>
        <p>• Filter destinations based on interests and travel style, and create personalized</p>
      </div>

      <button className="apply-btn">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;