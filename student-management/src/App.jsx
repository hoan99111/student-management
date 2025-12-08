import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddStudentForm from "./component/addStudentForm";
import StudentList from "./component/studentList";
import SearchBar from "./component/SearchBar";

function App() {
  const [students, setStudents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  //bai 5
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //bai 6
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortAsc ? -1 : 1;

    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortAsc ? 1 : -1;

    return 0;
  });

  return (
    <div className="App">
      <h1>Student Management</h1>
      <div className="div-btn">
        <button
          className="btn add-student-btn"
          onClick={() => setIsFormOpen(true)}
        >
          Thêm học sinh mới
        </button>
        <button
          className="btn add-student-btn"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sắp xếp theo tên {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <AddStudentForm
        setStudents={setStudents}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <StudentList
        students={sortedStudents}
        setStudents={setStudents}
        setSortAsc={setSortAsc}
      />
    </div>
  );
}

export default App;
