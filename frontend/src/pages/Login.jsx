import { useState, useContext } from "react";
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react"; // අයිකන සඳහා

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // පෙන්වීමට/සැඟවීමට state එකක්
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password); 
      if (userData?.role === 'manager') {
        navigate('/dashboard');
      } else {
        navigate('/report');
      }
    } catch (err) {
      alert("Login failed. Please check your credentials."); 
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
          className="w-full p-3 rounded-xl border border-slate-300" 
          required 
        />
        
        {/* Password field එක මෙතනදී වෙනස් වේ */}
        <div className="relative w-full">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 rounded-xl border border-slate-300" 
            required 
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;