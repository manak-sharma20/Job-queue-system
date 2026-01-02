const express = require("express");
const jobRoutes = require("./routes/job.routes");

const app = express();

app.use(express.json());
app.use(jobRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
