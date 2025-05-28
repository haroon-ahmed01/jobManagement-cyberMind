import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src={logo}/>
        </div>
        
        <nav className="navbar-nav">
          <div className="navbar-link-container home">
            <Link to="/" className="navbar-link">Home</Link>
          </div>
          
          <div className="navbar-link-container find-jobs">
            <Link to="/find-jobs" className="navbar-link">Find Jobs</Link>
          </div>
          
          <div className="navbar-link-container find-talents">
            <Link to="/find-talents" className="navbar-link">Find Talents</Link>
          </div>
          
          <div className="navbar-link-container about-us">
            <Link to="/about-us" className="navbar-link">About us</Link>
          </div>
          
          <div className="navbar-link-container testimonials">
            <Link to="/testimonials" className="navbar-link">Testimonials</Link>
          </div>

          <div className="create-job-container">
          <button
            className="create-job-btn"
            onClick={() => navigate('/create-job')}
          >
            Create Jobs
          </button>
        </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;