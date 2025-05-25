import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import jobService from "../services/jobService";

export default function JobCreationPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.salary = {
        min: Number(data.salaryMin),
        max: Number(data.salaryMax),
      };
      data.experience = {
        min: Number(data.experienceMin),
        max: Number(data.experienceMax),
      };

      delete data.salaryMin;
      delete data.salaryMax;
      delete data.experienceMin;
      delete data.experienceMax;

      await jobService.createJob(data);
      navigate("/");
    } catch (err) {
      console.error("Failed to create job:", err.response?.data || err.message);
      alert("Failed to create job.");
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo"></div>
          <a href="/" className="navbar-title">
            Job Portal
          </a>
        </div>
        <nav className="navbar-nav">
          <a href="/" className="navbar-link">
            Home
          </a>
          <a href="/find-jobs" className="navbar-link">
            Find Jobs
          </a>
          <a href="/find-talents" className="navbar-link">
            Find Talents
          </a>
          <a href="/about-us" className="navbar-link">
            About us
          </a>
          <a href="/testimonials" className="navbar-link">
            Testimonials
          </a>
          <button className="create-job-btn">Create Jobs</button>
        </nav>
      </div>

      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">Create Job Opening</h2>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input
                    {...register("title", { required: true })}
                    placeholder="Full Stack Developer"
                    className="form-input"
                  />
                  {errors.title && (
                    <span className="error-message">Title is required</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    {...register("company", { required: true })}
                    placeholder="Amazon, Microsoft, Swiggy"
                    className="form-input"
                  />
                  {errors.company && (
                    <span className="error-message">Company is required</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    {...register("location", { required: true })}
                    placeholder="Choose Preferred Location"
                    className="form-input"
                  />
                  {errors.location && (
                    <span className="error-message">Location is required</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Job Type</label>
                  <select
                    {...register("type", { required: true })}
                    className="form-select job-type-select-option"
                  >
                      <option value="">
                        Full Time
                      </option>
                      <option value="Internship">
                        Internship
                      </option>
                      <option value="Part-time">
                        Part time
                      </option>
                      <option value="Contract">
                        Contract
                      </option>
                  </select>
                  {errors.type && (
                    <span className="error-message">Type is required</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Salary Range</label>
                  <div className="salary-group">
                    <input
                      {...register("salaryMin", { required: true })}
                      placeholder="₹ 0"
                      type="number"
                      className="form-input"
                    />
                    <input
                      {...register("salaryMax", { required: true })}
                      placeholder="₹ 12,00,000"
                      type="number"
                      className="form-input"
                    />
                  </div>
                  {(errors.salaryMin || errors.salaryMax) && (
                    <span className="error-message">Salary range required</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Application Deadline</label>
                  <input
                    {...register("deadline", { required: true })}
                    type="date"
                    className="form-input"
                  />
                  {errors.deadline && (
                    <span className="error-message">Deadline is required</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Experience Range</label>
                  <div className="salary-group">
                    <input
                      {...register("experienceMin", { required: true })}
                      placeholder="Min Exp (yrs)"
                      type="number"
                      className="form-input"
                    />
                    <input
                      {...register("experienceMax", { required: true })}
                      placeholder="Max Exp (yrs)"
                      type="number"
                      className="form-input"
                    />
                  </div>
                  {(errors.experienceMin || errors.experienceMax) && (
                    <span className="error-message">
                      Experience range required
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Company Logo URL</label>
                  <input
                    {...register("logoUrl")}
                    placeholder="Company Logo URL (optional)"
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Job Description</label>
                  <textarea
                    {...register("description", { required: true })}
                    placeholder="Please share a description to let the candidate know more about the job role"
                    className="form-textarea"
                  />
                  {errors.description && (
                    <span className="error-message">
                      Description is required
                    </span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Requirements</label>
                  <textarea
                    {...register("requirements", { required: true })}
                    placeholder="List the key requirements for this position"
                    className="form-textarea"
                  />
                  {errors.requirements && (
                    <span className="error-message">
                      Requirements are required
                    </span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Responsibilities</label>
                  <textarea
                    {...register("responsibilities", { required: true })}
                    placeholder="Describe the main responsibilities of this role"
                    className="form-textarea"
                  />
                  {errors.responsibilities && (
                    <span className="error-message">
                      Responsibilities are required
                    </span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary">
                  Save Draft ↓
                </button>
                <button type="submit" className="btn-primary">
                  Publish →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}