require("dotenv").config();

const app = require("./app");


const PORT = 3000;
app.get("/health", (req, res) => {
  res.send("SERVER IS RUNNING");
});


app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
