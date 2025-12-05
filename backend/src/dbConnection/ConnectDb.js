import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/student_db");
    console.log("✅ Đã kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
    process.exit(1); // Dừng server nếu không kết nối được DB
  }
};
export default connectDB;
