import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <form className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <button className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
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