const express = require("express");
const jobRoutes = require("../src/routes/job.route")

const app = express();

app.use(express.json());
app.use("/",jobRoutes);
app.get("/health", (req, res) => {
    res.send("OK");
  });
  

module.exports=app;