const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');

// POST /api/jobs — Create a job
router.post('/jobs', createJob);

// GET /api/jobs — Fetch all jobs or with filters
router.get('/jobs', getJobs);

module.exports = router;
