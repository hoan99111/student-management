import axios from "axios";
import { React, useState } from "react";
import "./addStudentForm.css";

//bai 2

export default function AddStudentForm({ setStudents, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStu = { name, age: Number(age), class: stuClass };
    axios
      .post("http://localhost:5000/api/students", newStu)
      .then((res) => {
        console.log("Đã thêm:", res.data);
        // Cập nhật state students để hiển thị luôn học sinh mới:
        setStudents((prev) => [...prev, res.data]);
        // Xóa nội dung form sau khi thêm thành công
        setName("");
        setAge("");
        setStuClass("");
        // Đóng popup sau khi thêm thành công
        onClose();
      })
      .catch((err) => console.error("Lỗi khi thêm:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Thêm học sinh mới</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleAddStudent} className="student-form">
          <div className="form-group">
            <label>Họ tên:</label>
            <input
              type="text"
              placeholder="Nhập họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Tuổi:</label>
            <input
              type="number"
              placeholder="Nhập tuổi"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
              max="100"
            />
          </div>
          <div className="form-group">
            <label>Lớp:</label>
            <input
              type="text"
              placeholder="Nhập lớp"
              value={stuClass}
              onChange={(e) => setStuClass(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Thêm học sinh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
