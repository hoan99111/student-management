import axios from "axios";
import { React, useEffect, useState } from "react";
import "./addStudentForm.css";

//bai 3

export default function UpdateStudentForm({
  setStudents,
  student,
  isOpen,
  onClose,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  useEffect(() => {
    if (!student) return;
    // schedule state updates in a microtask to avoid synchronous setState in effect
    Promise.resolve().then(() => {
      setName(student.name ?? "");
      setAge(student.age ?? "");
      setStuClass(student.class ?? "");
    });
  }, [student]);

  const handleAddStudent = (e) => {
    e.preventDefault();

    const updatedStu = { name, age: Number(age), class: stuClass };
    axios
      .put(`http://localhost:5000/api/students/${student._id}`, updatedStu)
      .then((res) => {
        console.log("Đã cập nhật:", res.data);
        // Cập nhật state students để hiển thị luôn học sinh mới:
        setStudents((students) =>
          students.map((stu) => (stu._id === student._id ? res.data : stu))
        );
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
          <h2>Cập nhật thông tin học sinh</h2>
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
            <button type="submit" className="submit-btn update-btn">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
