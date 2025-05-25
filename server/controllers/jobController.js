const Job = require('../models/jobModel');

// POST - Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET - Fetch jobs with optional filters
exports.getJobs = async (req, res) => {
  try {
    const { title, location, type, salaryMin, salaryMax } = req.query;

    const filter = {};

    // Title search (case-insensitive)
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    // Location search (case-insensitive)
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    // Exact match for job type
    if (type) {
      filter.type = type;
    }

    // Salary range (jobs overlapping with the given range)
    if (salaryMin || salaryMax) {
      filter['salary.min'] = { $lte: Number(salaryMax) || 1e9 };
      filter['salary.max'] = { $gte: Number(salaryMin) || 0 };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
