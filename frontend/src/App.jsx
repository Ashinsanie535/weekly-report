import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import MyReports from "./pages/MyReports";
import EditReport from "./pages/EditReport"; // EditReport පිටුව import කිරීම
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; 
import ManageProjects from "./pages/ManageProjects";

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
        
        {/* Weekly Report submission route */}
        <Route path="/report" element={
          <ProtectedRoute allowedRoles={['team_member', 'manager']}>
            <Report />
          </ProtectedRoute>
        } />
        
        {/* My Reports route */}
        <Route path="/my-reports" element={
          <ProtectedRoute allowedRoles={['team_member', 'manager']}>
            <MyReports />
          </ProtectedRoute>
        } />

        {/* Edit Report route (මෙය අලුතින් එක් කරන ලදී) */}
        <Route path="/edit-report/:id" element={
          <ProtectedRoute allowedRoles={['team_member', 'manager']}>
            <EditReport />
          </ProtectedRoute>
        } />

        {/* Team Dashboard route (Manager සඳහා) */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Project Management route (Manager සඳහා) */}
        <Route path="/manage-projects" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ManageProjects />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;