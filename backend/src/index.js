const sequelize = require("./config/database");

const express = require("express");
const cors = require("cors");

require("./models/User");
require("./models/Transaction");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Transaction & Audit Log Backend is running");
});

const PORT = 5000;
sequelize
  .sync()
  .then(() => {
    console.log("Database connected & synced");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
