import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/student";
import Signup from "./pages/signup";
import Login from "./pages/login";
import React, { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
function App() {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const user = false;
    if (user) {
      setCurrentUser(user);
    }
  });

  return (
    <div>
      <section>
        <h1>Demo Logging in</h1>
        <div>{currentUser ? <h2>Logged In</h2> : <h2>Logged Out</h2>}</div>
        <Routes className="App-link">
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/student" element={<Student />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
