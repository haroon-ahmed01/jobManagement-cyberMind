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
        <h3>
          {job.title}
        </h3>
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

        {/* Work Type */}
        <div className="job-card-detail-item">
          <svg width="19" height="16.41" viewBox="0 0 20 17" fill="none">
            <path d="M2 15V3C2 2.45 2.19583 1.97917 2.5875 1.5875C2.97917 1.19583 3.45 1 4 1H16C16.55 1 17.0208 1.19583 17.4125 1.5875C17.8042 1.97917 18 2.45 18 3V15L14 13L10 15L6 13L2 15Z" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
          </svg>
          <span className="job-card-detail-worktype">
            {job.workType || 'Onsite'}
          </span>
        </div>

        {/* Salary */}
        <div className="job-card-detail-item">
          <svg width="18.18" height="20" viewBox="0 0 19 21" fill="none">
            <path d="M9 1V20M12 4H7.5C6.83696 4 6.20107 4.26339 5.73223 4.73223C5.26339 5.20107 5 5.83696 5 6.5C5 7.16304 5.26339 7.79893 5.73223 8.26777C6.20107 8.73661 6.83696 9 7.5 9H10.5C11.163 9 11.7989 9.26339 12.2678 9.73223C12.7366 10.2011 13 10.837 13 11.5C13 12.163 12.7366 12.7989 12.2678 13.2678C11.7989 13.7366 11.163 14 10.5 14H5" stroke="#5A5A5A" strokeWidth="1.6" fill="none"/>
          </svg>
          <span className="job-card-detail-salary">{job.salary?.min || 12}LPA</span>
        </div>
      </div>

      <div className="job-card-description">
        {job.description ? (
          <div>
            {job.description.split('\n').slice(0, 2).map((line, index) => (
              <div key={index} className="job-card-description-item">
                {line.startsWith('•') ? line : `• ${line}`}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="job-card-description-item">
              • A user-friendly interface lets you browse stunning photos and videos
            </div>
            <div className="job-card-description-item">
              • Filter destinations based on interests and travel style, and create personalized
            </div>
          </div>
        )}
      </div>

      <div className="job-card-apply-button-container">
        <button className="job-card-apply-button"
        onClick={() => {
          console.log('Apply clicked for:', job.title);
        }}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

const JobListingGrid = ({ jobs = [] }) => {
  // Sample data if no jobs provided
  const sampleJobs = [
    // {
    //   id: 1,
    //   title: 'Full Stack Developer',
    //   company: 'Amazon',
    //   createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    //   experience: { min: 1, max: 3 },
    //   salary: { min: 12, max: 18 },
    //   workType: 'Onsite',
    //   description: 'Build scalable web applications using modern technologies\nWork with cross-functional teams to deliver high-quality products\nParticipate in code reviews and maintain coding standards'
    // },
    // {
    //   id: 2,
    //   title: 'Node Js Developer',
    //   company: 'Tesla',
    //   createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    //   experience: { min: 1, max: 3 },
    //   salary: { min: 12, max: 15 },
    //   workType: 'Onsite',
    //   description: 'Develop robust backend services using Node.js\nDesign and implement RESTful APIs\nOptimize database queries and improve application performance'
    // },
    // {
    //   id: 3,
    //   title: 'UX/UI Designer',
    //   company: 'Swiggy',
    //   createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    //   experience: { min: 1, max: 3 },
    //   salary: { min: 12, max: 16 },
    //   workType: 'Onsite',
    //   description: 'Create intuitive and visually appealing user interfaces\nConduct user research and usability testing\nCollaborate with development teams to implement designs'
    // },
    // {
    //   id: 4,
    //   title: 'Full Stack Developer',
    //   company: 'Microsoft',
    //   createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    //   experience: { min: 1, max: 3 },
    //   salary: { min: 12, max: 20 },
    //   workType: 'Onsite',
    //   description: 'End-to-end development of web applications\nIntegrate third-party services and APIs\nEnsure responsive design across multiple devices'
    // },
    // {
    //   id: 5,
    //   title: 'Node Js Developer',
    //   company: 'Google',
    //   createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    //   experience: { min: 1, max: 3 },
    //   salary: { min: 15, max: 22 },
    //   workType: 'Remote',
    //   description: 'Build microservices and distributed systems\nImplement automated testing and CI/CD pipelines\nMonitor and maintain production applications'
    // },
    // {
    //   id: 6,
    //   title: 'UX/UI Designer',
    //   company: 'Apple',
    //   createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    //   experience: { min: 2, max: 4 },
    //   salary: { min: 18, max: 25 },
    //   workType: 'Hybrid',
    //   description: 'Design user-centered digital experiences\nCreate wireframes, prototypes, and high-fidelity mockups\nMaintain design systems and style guides'
    // },
    // {
    //   id: 7,
    //   title: 'Full Stack Developer',
    //   company: 'Meta',
    //   createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    //   experience: { min: 2, max: 5 },
    //   salary: { min: 20, max: 30 },
    //   workType: 'Remote',
    //   description: 'Develop social media platform features\nOptimize for performance and scalability\nWork with big data and real-time systems'
    // },
    // {
    //   id: 8,
    //   title: 'Node Js Developer',
    //   company: 'Netflix',
    //   createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    //   experience: { min: 1, max: 3 },
    //   salary: { min: 16, max: 24 },
    //   workType: 'Remote',
    //   description: 'Build streaming platform backend services\nImplement content delivery optimization\nDevelop recommendation algorithms'
    // }
  ];

  const displayJobs = jobs.length > 0 ? jobs : sampleJobs;

  return (
    <div className="job-listing-grid-container">
      <div className="job-listing-grid-wrapper">
        <div className="job-listing-grid">
          {displayJobs.length === 0 ? (
            <div className="job-listing-no-jobs">
              <p>
                No jobs found.
              </p>
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