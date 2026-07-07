// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Report from "./pages/Report";    // Import the new Report page
import Dashboard from "./pages/Dashboard"; // Import the new Dashboard page
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Weekly Report submission route for team members */}
        <Route path="/report" element={<Report />} />
        
        {/* Team Dashboard route for managers */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;