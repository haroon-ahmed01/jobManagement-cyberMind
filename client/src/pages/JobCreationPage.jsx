import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jobService from "../services/jobService";
import JobListingPage from "./JobListingPage";
import "./JobCreationPage.css";

export default function JobCreationPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const jobData = {
        ...data,
        salary: {
          min: Number(data.salaryMin) || 0,
          max: Number(data.salaryMax) || 0,
        },
        experience: {
          min: Number(data.experienceMin) || 0,
          max: Number(data.experienceMax) || 0,
        }
      };

      delete jobData.salaryMin;
      delete jobData.salaryMax;
      delete jobData.experienceMin;
      delete jobData.experienceMax;

      console.log("Submitting job data:", jobData); 

      await jobService.createJob(jobData);
      
      reset();
      navigate("/");
    } catch (err) {
      console.error("Failed to create job:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to create job";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    navigate("/");
  };

  const handleSaveDraft = () => {
    console.log("Save draft functionality not implemented yet");
  };

  return (
    <div className="job-creation-page">
      <div className="job-creation-background">
        <JobListingPage />
      </div>

      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">Create Job Opening</h2>
            <button 
              onClick={handleCloseModal}
              className="modal-close-button"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input
                    {...register("title", { required: "Job title is required" })}
                    placeholder="Full Stack Developer"
                    className="form-input"
                  />
                  {errors.title && (
                    <span className="error-message">{errors.title.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    {...register("company", { required: "Company name is required" })}
                    placeholder="Amazon, Microsoft, Swiggy"
                    className="form-input"
                  />
                  {errors.company && (
                    <span className="error-message">{errors.company.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    {...register("location", { required: "Location is required" })}
                    placeholder="Choose Preferred Location"
                    className="form-input"
                  />
                  {errors.location && (
                    <span className="error-message">{errors.location.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Job Type</label>
                  <select
                    {...register("type", { required: "Job type is required" })}
                    className="form-select"
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full Time</option>
                    <option value="Part-time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                  {errors.type && (
                    <span className="error-message">{errors.type.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Salary Range</label>
                  <div className="salary-group">
                    <input
                      {...register("salaryMin", { 
                        required: "Minimum salary is required",
                        min: { value: 0, message: "Salary must be positive" }
                      })}
                      placeholder="₹ 0"
                      type="number"
                      className="form-input"
                    />
                    <input
                      {...register("salaryMax", { 
                        required: "Maximum salary is required",
                        min: { value: 0, message: "Salary must be positive" }
                      })}
                      placeholder="₹ 12,00,000"
                      type="number"
                      className="form-input"
                    />
                  </div>
                  {(errors.salaryMin || errors.salaryMax) && (
                    <span className="error-message">
                      {errors.salaryMin?.message || errors.salaryMax?.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Application Deadline</label>
                  <input
                    {...register("deadline", { required: "Application deadline is required" })}
                    type="date"
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]} 
                  />
                  {errors.deadline && (
                    <span className="error-message">{errors.deadline.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Experience Range</label>
                  <div className="salary-group">
                    <input
                      {...register("experienceMin", { 
                        required: "Minimum experience is required",
                        min: { value: 0, message: "Experience must be positive" }
                      })}
                      placeholder="Min Exp (yrs)"
                      type="number"
                      className="form-input"
                    />
                    <input
                      {...register("experienceMax", { 
                        required: "Maximum experience is required",
                        min: { value: 0, message: "Experience must be positive" }
                      })}
                      placeholder="Max Exp (yrs)"
                      type="number"
                      className="form-input"
                    />
                  </div>
                  {(errors.experienceMin || errors.experienceMax) && (
                    <span className="error-message">
                      {errors.experienceMin?.message || errors.experienceMax?.message}
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
                    {...register("description", { required: "Job description is required" })}
                    placeholder="Please share a description to let the candidate know more about the job role"
                    className="form-textarea"
                  />
                  {errors.description && (
                    <span className="error-message">{errors.description.message}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Requirements</label>
                  <textarea
                    {...register("requirements")}
                    placeholder="List the key requirements for this position (optional)"
                    className="form-textarea"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Responsibilities</label>
                  <textarea
                    {...register("responsibilities")}
                    placeholder="Describe the main responsibilities of this role (optional)"
                    className="form-textarea"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                >
                  Save Draft ↓
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish »'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}