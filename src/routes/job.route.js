const express = require("express");
const createJob = require("../controllers/job.controller");
const jobStatus = require("../controllers/jobstatus.controller");

const router = express.Router();
console.log("🔥 job.route.js LOADED");

router.post("/jobs", createJob.createJob ?? createJob);
router.get("/jobs/:id", jobStatus.jobStatus ?? jobStatus);

module.exports = router;
