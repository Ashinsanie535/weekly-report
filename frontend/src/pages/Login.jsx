import { useState, useContext } from "react";
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      
      await login(email, password);
      
      navigate("/");
    } catch (err) {
      
      console.error("Login failed:", err);
      alert(err); 
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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