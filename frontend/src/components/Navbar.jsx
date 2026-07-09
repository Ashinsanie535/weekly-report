// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 text-white p-4 px-6 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">ReportGen</div>
      
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="px-4 py-2 text-sm font-medium border border-white/30 rounded-lg hover:bg-white hover:text-slate-900 transition-all">Login</Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">Register</Link>
          </>
        ) : (
          <>
            <Link to="/report" className="hover:text-blue-400">Submit Report</Link>
            
            {/* Team Member සඳහා My Reports ලින්ක් එක */}
            {user.role === 'team_member' && (
              <Link to="/my-reports" className="hover:text-blue-400">My Reports</Link>
            )}

            {/* Manager සඳහා Dashboard සහ Manage Projects */}
            {user.role === 'manager' && (
              <>
                <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
                <Link to="/manage-projects" className="hover:text-blue-400">Manage Projects</Link>
              </>
            )}
            
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 text-sm font-medium bg-red-600 rounded-lg hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;