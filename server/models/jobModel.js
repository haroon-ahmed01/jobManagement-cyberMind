const mongoose = require('mongoose');



const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true,
  },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  experience: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  description: { type: String, required: true },
  requirements: { type: [String], default: [] },
  responsibilities: { type: [String], default: [] },
  deadline: { type: Date, required: true },
  logoUrl: { type: String, default: "" },
}, 
{ 
  timestamps: true 
});


const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;



