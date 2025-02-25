import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Student() {
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_API_URL;

  let ignoreRef = useRef(false);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
  });

  const getStudents = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/student`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          console.log("API Data:", data); // Log the API data to the console
          setStudents(data);
        });
    } catch (err) {
      setError(err.message || "unexpected error");
      console.error("error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${API_BASE}/student`, {
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
    }
  };

  useEffect(() => {
    if (!ignoreRef.current) {
      getStudents();
      return () => {
        ignoreRef.current = true;
      };
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/students/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error("error:", err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Students:</h1>
        {loading && <p>Loading...</p>}
        {students.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student._id}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>
                    <button onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
