import React from "react";

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
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Time Badge */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        backgroundColor: '#bfdbfe',
        color: '#1e40af',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500'
      }}>
        {formatTimeAgo(job.createdAt)}
      </div>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        gap: '12px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: '#ffffff'
        }}>
          {getCompanyLogo(job.company)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 4px 0',
            lineHeight: '1.2'
          }}>
            {job.title}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: '0'
          }}>
            {job.company}
          </p>
        </div>
      </div>

      {/* Job Details Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px',
        flexWrap: 'wrap',
        fontSize: '14px',
        color: '#4b5563'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          👥 {job.experience?.min || 1}-{job.experience?.max || 3} yr Exp
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          🏢 {job.workType || 'Onsite'}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          💰 {job.salary?.min || 12}LPA
        </span>
      </div>

      {/* Description */}
      <div style={{
        marginBottom: '20px',
        flex: '1'
      }}>
        {job.description ? (
          <div style={{
            fontSize: '14px',
            color: '#4b5563',
            lineHeight: '1.5'
          }}>
            {job.description.split('\n').map((line, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                {line.startsWith('•') ? line : `• ${line}`}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            fontSize: '14px',
            color: '#4b5563',
            lineHeight: '1.5'
          }}>
            <div style={{ marginBottom: '8px' }}>
              • A user-friendly interface lets you browse stunning photos and videos
            </div>
            <div style={{ marginBottom: '8px' }}>
              • Filter destinations based on interests and travel style, and create personalized
            </div>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <button style={{
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.2s ease',
        marginTop: 'auto'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
      onClick={() => {
        // Handle apply logic here
        console.log('Apply clicked for:', job.title);
      }}>
        Apply Now
      </button>
    </div>
  );
};

const JobListingGrid = ({ jobs = [] }) => {
  // Sample data if no jobs provided
  const sampleJobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'Amazon',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      experience: { min: 1, max: 3 },
      salary: { min: 12, max: 18 },
      workType: 'Onsite',
      description: 'Build scalable web applications using modern technologies\nWork with cross-functional teams to deliver high-quality products\nParticipate in code reviews and maintain coding standards'
    },
    {
      id: 2,
      title: 'Node Js Developer',
      company: 'Tesla',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      experience: { min: 1, max: 3 },
      salary: { min: 12, max: 15 },
      workType: 'Onsite',
      description: 'Develop robust backend services using Node.js\nDesign and implement RESTful APIs\nOptimize database queries and improve application performance'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Swiggy',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      experience: { min: 1, max: 3 },
      salary: { min: 12, max: 16 },
      workType: 'Onsite',
      description: 'Create intuitive and visually appealing user interfaces\nConduct user research and usability testing\nCollaborate with development teams to implement designs'
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'Microsoft',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      experience: { min: 1, max: 3 },
      salary: { min: 12, max: 20 },
      workType: 'Onsite',
      description: 'End-to-end development of web applications\nIntegrate third-party services and APIs\nEnsure responsive design across multiple devices'
    },
    {
      id: 5,
      title: 'Node Js Developer',
      company: 'Google',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      experience: { min: 1, max: 3 },
      salary: { min: 15, max: 22 },
      workType: 'Remote',
      description: 'Build microservices and distributed systems\nImplement automated testing and CI/CD pipelines\nMonitor and maintain production applications'
    },
    {
      id: 6,
      title: 'UX/UI Designer',
      company: 'Apple',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      experience: { min: 2, max: 4 },
      salary: { min: 18, max: 25 },
      workType: 'Hybrid',
      description: 'Design user-centered digital experiences\nCreate wireframes, prototypes, and high-fidelity mockups\nMaintain design systems and style guides'
    },
    {
      id: 7,
      title: 'Full Stack Developer',
      company: 'Meta',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      experience: { min: 2, max: 5 },
      salary: { min: 20, max: 30 },
      workType: 'Remote',
      description: 'Develop social media platform features\nOptimize for performance and scalability\nWork with big data and real-time systems'
    },
    {
      id: 8,
      title: 'Node Js Developer',
      company: 'Netflix',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      experience: { min: 1, max: 3 },
      salary: { min: 16, max: 24 },
      workType: 'Remote',
      description: 'Build streaming platform backend services\nImplement content delivery optimization\nDevelop recommendation algorithms'
    }
  ];

  const displayJobs = jobs.length > 0 ? jobs : sampleJobs;

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {displayJobs.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                margin: '0'
              }}>
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