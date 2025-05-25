import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="navbar">
        <div className="navbar-logo"></div>
      <nav className="navbar-nav">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/find-jobs" className="navbar-link">Find Jobs</Link>
        <Link to="/find-talents" className="navbar-link">Find Talents</Link>
        <Link to="/about-us" className="navbar-link">About us</Link>
        <Link to="/testimonials" className="navbar-link">Testimonials</Link>
        <button 
          className="create-job-btn"
          onClick={() => navigate('/create-job')}
        >
          Create Jobs
        </button>
      </nav>
    </div>
  );
};

export default Navbar;