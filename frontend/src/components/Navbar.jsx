import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 px-6 flex justify-between items-center w-full shadow-md">
      <div className="font-bold text-xl">Dashboard</div>
      <div className="flex items-center gap-4">
        <Link 
          to="/login" 
          className="px-4 py-2 text-sm font-medium border border-white/30 rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-200"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="px-4 py-2 text-sm font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;