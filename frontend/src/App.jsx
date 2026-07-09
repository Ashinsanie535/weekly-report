// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // මෙය import කරන්න

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* මුලික මාර්ගය login වෙත යොමු කිරීම */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Weekly Report submission route (Team Member & Manager දෙදෙනාටම අවසර ඇත) */}
        <Route path="/report" element={
          <ProtectedRoute allowedRoles={['team_member', 'manager']}>
            <Report />
          </ProtectedRoute>
        } />
        
        {/* Team Dashboard route (Manager ට පමණක් අවසර ඇත) */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;