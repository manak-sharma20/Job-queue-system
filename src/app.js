const express = require("express");
const jobRoutes = require("../src/routes/job.route")

const app = express();

app.use(express.json());
app.use(jobRoutes);

module.exports=app;