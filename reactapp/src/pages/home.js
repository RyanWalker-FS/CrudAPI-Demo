import { Link } from "react-router-dom";

import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Students List Homepage</h1>
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
        <Link to="/login" className="nav-link">
          Login
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

export default Home;
