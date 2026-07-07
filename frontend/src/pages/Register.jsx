import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", formData);
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join our platform">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full p-2 border border-slate-300 rounded mt-1"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full p-2 border border-slate-300 rounded mt-1"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full p-2 border border-slate-300 rounded mt-1"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Role</label>
          <select
            name="role"
            className="w-full p-2 border border-slate-300 rounded mt-1"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="member">Team Member</option>
            <option value="manager">Manager / Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-4">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </AuthLayout>
  );
};

export default Register;