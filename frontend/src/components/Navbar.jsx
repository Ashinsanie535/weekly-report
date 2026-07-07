import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user state and logout function

  return (
    <nav className="bg-slate-900 text-white p-4 px-6 flex justify-between items-center w-full shadow-md">
      <div className="font-bold text-xl">ReportGen</div>
      
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            {/* Show Login/Register if the user is NOT logged in */}
            <Link to="/login" className="px-4 py-2 text-sm font-medium border border-white/30 rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-200">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Show these links if the user IS logged in */}
            <Link to="/report" className="hover:text-blue-400">Submit Report</Link>
            
            {/* Show Dashboard only if the user is a Manager */}
            {user.role === 'manager' && (
              <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            )}
            
            <button 
              onClick={logout} 
              className="px-4 py-2 text-sm font-medium bg-red-600 rounded-lg hover:bg-red-700"
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