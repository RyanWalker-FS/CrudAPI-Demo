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
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState(null);

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
      setLoadingState(false);
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
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/student" className="nav-link">
          Student
        </Link>
      </header>
    </div>
  );
}

export default Dashboard;
