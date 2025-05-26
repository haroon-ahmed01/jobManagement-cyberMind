const Job = require('../models/jobModel');

exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { title, location, type, salaryMin, salaryMax } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (type) {
      filter.type = type;
    }

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
