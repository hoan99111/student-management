import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  return (
    <div className="App">
      <h1>Student Management</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - Age: {student.age} - Class: {student.class}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
