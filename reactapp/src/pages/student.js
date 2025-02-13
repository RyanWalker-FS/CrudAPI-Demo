import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Student() {
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_API_BASE;
  let ignore = false;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStudents = async () => {
    try {
      await fetch(`${API_BASE}/students`)
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
        )}{" "}
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Student;
