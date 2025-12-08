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

app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await studentModel.create(req.body); // tạo document mới từ dữ liệu trong req.body
    res.status(201).json(newStudent);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(req.params.id); // Xoá document theo ID từ req.params.id
    if (!deletedStudent) {
      return res.status(404).json({ error: "Học sinh không tìm thấy" });
    }
    res.json({ message: "Đã xoá học sinh" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,  
      req.body,
      { new: true } 
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Học sinh không tìm thấy" });
    } 
    res.json(updatedStudent);
  } catch (e) {
    res.status(400).json({ error: e.message });
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
