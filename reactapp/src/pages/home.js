import { Link } from "react-router-dom";

import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Students List Homepage</h1>
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
