import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/student";
function App() {
  const API_BASE =
    process.env.node_env === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/student" element={<Student />} />
      </Routes>
    </Router>
  );
}

export default App;
