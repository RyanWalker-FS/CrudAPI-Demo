import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/student";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  );
}

export default App;
