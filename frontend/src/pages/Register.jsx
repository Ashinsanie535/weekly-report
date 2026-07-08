import { useState } from "react";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "team_member", // මෙතැනදී default value එකට 'team_member' දෙන්න
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role, // දැන් මෙතැනින් 'team_member' හෝ 'manager' යැවේ
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="pt-28 pb-10 w-full min-h-screen bg-blue-50 flex justify-center items-start">
      <AuthLayout title="Create Account" subtitle="Join our platform">
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          
          <div>
            <label className="text-sm font-medium text-slate-700 ml-1">Name</label>
            <input type="text" placeholder="Enter your full name" className="w-full p-3 rounded-xl border border-slate-300 mt-1" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
            <input type="email" placeholder="example@gmail.com" className="w-full p-3 rounded-xl border border-slate-300 mt-1" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
            <div className="relative mt-1">
              <input type={showPassword ? "text" : "password"} placeholder="Create a password" className="w-full p-3 rounded-xl border border-slate-300" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
              <button type="button" className="absolute right-3 top-3 text-slate-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-700 ml-1">Confirm Password</label>
            <div className="relative mt-1">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className="w-full p-3 rounded-xl border border-slate-300" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
              <button type="button" className="absolute right-3 top-3 text-slate-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 ml-1">Role</label>
            <select className="w-full p-3 rounded-xl border border-slate-300 mt-1" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="team_member">Team Member</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition mt-2">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
        </p>
      </AuthLayout>
    </div>
  );
};

export default Register;