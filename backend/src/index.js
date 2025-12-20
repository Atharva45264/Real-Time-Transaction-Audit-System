const express = require("express");
const cors = require("cors");

// Database
const sequelize = require("./config/database");

// Models (register them)
const User = require("./models/User");
require("./models/Transaction");

// Routes
const transferRoutes = require("./routes/transferRoutes");
const historyRoutes = require("./routes/historyRoutes");
const userRoutes = require("./routes/userRoutes");


// Create app FIRST
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", transferRoutes);
app.use("/api", historyRoutes);
app.use("/api", userRoutes);





// Health check route
app.get("/", (req, res) => {
  res.send("Transaction & Audit Log Backend is running");
});

// Database sync + seed users
sequelize
  .sync()
  .then(async () => {
    console.log("Database connected & synced");
    await User.update({ balance: 1000 }, { where: {} });
    console.log("Balances reset to 1000");


    // Create dummy users (for testing)
    await User.findOrCreate({ where: { name: "Alice" } });
    await User.findOrCreate({ where: { name: "Bob" } });
    
   
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });



// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
