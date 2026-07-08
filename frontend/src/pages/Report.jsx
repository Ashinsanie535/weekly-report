import { useState, useContext } from "react";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";
import { AuthContext } from "../context/AuthContext";

const Report = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    weekRange: "",
    project: "",
    tasksCompleted: "",
    tasksPlanned: "",
    blockers: "",
    hoursWorked: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reports", { 
        ...formData, 
        status: "submitted", 
        userId: user?.id 
      }, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      alert("Report submitted successfully!");
      setFormData({
        weekRange: "", project: "", tasksCompleted: "", 
        tasksPlanned: "", blockers: "", hoursWorked: "", notes: "" 
      });
    } catch (err) {
      alert("Failed to submit report. Please check your connection.");
    }
  };

  return (
    <div className="pt-20 pb-10 w-full min-h-screen bg-blue-50">
      <AuthLayout title="Submit Weekly Report" subtitle="Please fill in your progress">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Week Range</label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="e.g., 01/07/2026 - 07/07/2026" value={formData.weekRange} onChange={(e) => setFormData({...formData, weekRange: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Project Name/ID</label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter Project Name or ID" value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Tasks Completed</label>
            <textarea className="w-full p-2 border rounded-lg" placeholder="List your completed tasks..." value={formData.tasksCompleted} onChange={(e) => setFormData({...formData, tasksCompleted: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Tasks Planned</label>
            <textarea className="w-full p-2 border rounded-lg" placeholder="List your next week tasks..." value={formData.tasksPlanned} onChange={(e) => setFormData({...formData, tasksPlanned: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Blockers</label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Any issues or blockers?" value={formData.blockers} onChange={(e) => setFormData({...formData, blockers: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Hours Worked</label>
            <input 
              type="number" 
              min="0"
              placeholder="Total hours"
              className="w-full p-2 border rounded-lg" 
              value={formData.hoursWorked} 
              onChange={(e) => setFormData({...formData, hoursWorked: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea className="w-full p-2 border rounded-lg" placeholder="Additional notes..." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-bold transition">
            Submit Report
          </button>
        </form>
      </AuthLayout>
    </div>
  );
};

export default Report;