import react, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { set } from "mongoose";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_API_BASE;
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getStudents();
    }
    return () => {
      ignore = true;
    };
  }, []);
  const getStudents = async () => {
    try {
      await fetch(`${API_BASE}/students`)
        .then((res) => res.json())
        .then((data) => {
          setStudents(data);
        });
    } catch (err) {
      setError(error.message || "unexpected error");
    } finally {
      setloading(false);
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>Students:</h1>
          <ul>
            <li>John</li>
            <li>Paul</li>
            <li>George</li>
            <li>Ronny</li>
          </ul>
        </header>
      </div>
    );
  };
}

export default App;
