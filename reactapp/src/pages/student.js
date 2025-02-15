import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Student() {
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;
  let ignore = false;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
  });

  const getStudents = async () => {
    try {
      await fetch(`${BASE_URL}/api/v1/students`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data fetched:", data);
          setStudents(data);
        });
    } catch (err) {
      console.error("error:", err);
      setError(err.message || "unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("new student added:", data);
          setStudents([...students, data]);
          setNewStudent({
            name: "",
            class: "",
          });
        });
    } catch (err) {
      console.error("error:", err);
      setError(err.message || "unexpected error");
    }
  };

  useEffect(() => {
    if (!ignore) {
      getStudents();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Students:</h1>
        {loading && <p>Loading...</p>}
        {students.length > 0 && (
          <ul>
            {students.map((student) => (
              <li key={student._id}>{student.name}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={newStudent.name}
              onChange={(event) =>
                setNewStudent({ ...newStudent, name: event.target.value })
              }
            />
          </label>
          <label>
            Class:
            <input
              type="text"
              value={newStudent.class}
              onChange={(event) =>
                setNewStudent({ ...newStudent, class: event.target.value })
              }
            />
          </label>
          <button type="submit">Add Student</button>
        </form>
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Student;
