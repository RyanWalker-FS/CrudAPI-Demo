import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_BASE_URL;
  let ignoreRef = useRef(false);

  const [students, setStudents] = useState([]);
  const [setLoading] = useState(false);
  const [setError] = useState(null);

  const getStudents = async () => {
    try {
      await fetch(`${API_BASE}/students`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data fetched:", data);
        });
    } catch (err) {
      console.error("error:", err);
      setError(err.message || "unexpected error");
    } finally {
      setLoading(false);
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Students:</h1>
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/student">Student</Link>
      </header>
    </div>
  );
}

export default Dashboard;
