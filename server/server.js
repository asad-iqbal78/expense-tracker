const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// ✅ Middleware PEHLE - routes se upar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes - sirf ek baar
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// ✅ Server start
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();