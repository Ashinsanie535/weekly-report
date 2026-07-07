import { useState, useContext } from "react";
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // State to manage input fields for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Accessing the login function from the AuthContext
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default browser form submission behavior
    
    try {
      // Call the login function from context and wait for the response
      await login(email, password);
      // Navigate to the home page upon successful login
      navigate("/");
    } catch (err) {
      // Display an error message if the login fails
      console.error("Login failed:", err);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      {/* Form submission triggers the handleLogin function */}
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          Login
        </button>
        <p className="text-center text-sm text-slate-500 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;