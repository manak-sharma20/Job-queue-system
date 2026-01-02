const express = require("express");
const { createJob } = require("../controllers/job.controller");

const router = express.Router();

router.post("/jobs", createJob);

module.exports = router;
