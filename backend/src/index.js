import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentModel from "./model/student.model.js";
import connectDB from "./dbConnection/ConnectDb.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// API route to get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await studentModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const startServer = async () => {
  await connectDB();

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  });
};

startServer();