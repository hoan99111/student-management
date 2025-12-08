import axios from "axios";
import React, { useEffect, useState } from "react";
import "./studentList.css";
import UpdateStudentForm from "./updateStudentForm";

function StudentList({ students, setStudents, setSortAsc }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    console.log("Cập nhật danh sách học sinh:", students);
  }, [students]);

  //bai 4
  const handleDeleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        console.log("Đã xoá:", res.data);
        // Cập nhật lại danh sách học sinh trong state
        setStudents((prev) => prev.filter((stu) => stu._id !== id));
      })
      .catch((err) => console.error("Lỗi khi xoá:", err));
  };

  return (
    <>
      <div className="student-table">
        <div className="student-table-header">
          <div className="col name" onClick={() => setSortAsc((prev) => !prev)}>
            <span>Họ tên</span>
            <span className="sort-indicator">⇅</span>
          </div>
          <div className="col age">Tuổi</div>
          <div className="col class">Lớp</div>
          <div className="col actions">Hành động</div>
        </div>

        <ul className="student-list">
          {students.map((student) => (
            <li key={student._id} className="student-row">
              <div className="col name">
                <div className="student-name">{student.name}</div>
              </div>
              <div className="col age">{student.age}</div>
              <div className="col class">{student.class}</div>
              <div className="col actions">
                <button
                  className="btn edit"
                  onClick={() => {
                    setIsFormOpen(true);
                    setEditingStudent(student);
                  }}
                  aria-label={`Sửa ${student.name}`}
                >
                  Sửa
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDeleteStudent(student._id)}
                  aria-label={`Xoá ${student.name}`}
                >
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <UpdateStudentForm
        setStudents={setStudents}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        student={editingStudent}
      />
    </>
  );
}

export default StudentList;
