import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";
import { AuthContext } from "../context/AuthContext";

const Report = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    weekRange: "",
    project: "",
    tasksCompleted: "",
    tasksPlanned: "",
    blockers: "",
    hoursWorked: "",
    notes: "",
  });

  // ව්‍යාපෘති ලැයිස්තුව Fetch කිරීම
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?.token) return;
      try {
        const { data } = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // වැළැක්වීමේ පරීක්ෂාව (Hours cannot be negative)
    if (formData.hoursWorked < 0) {
      alert("Hours worked cannot be negative!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reports", { 
        ...formData, 
        status: "submitted"
      }, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      alert("Report submitted successfully!");
      
      // පෝරමය Reset කිරීම
      setFormData({ 
        weekRange: "", 
        project: "", 
        tasksCompleted: "", 
        tasksPlanned: "", 
        blockers: "", 
        hoursWorked: "", 
        notes: "" 
      });
    } catch (err) {
      console.error("Submission error:", err);
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
            <label className="block text-sm font-medium text-slate-700">Project</label>
            <select className="w-full p-2 border rounded-lg" value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} required>
              <option value="">Select a Project</option>
              {projects.map((p) => (<option key={p._id} value={p._id}>{p.name}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Tasks Completed</label>
            <textarea className="w-full p-2 border rounded-lg" placeholder="Detail the work you finished this week..." value={formData.tasksCompleted} onChange={(e) => setFormData({...formData, tasksCompleted: e.target.value})} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Tasks Planned</label>
            <textarea className="w-full p-2 border rounded-lg" placeholder="What will you focus on next week?" value={formData.tasksPlanned} onChange={(e) => setFormData({...formData, tasksPlanned: e.target.value})} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Blockers</label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Any obstacles or issues faced?" value={formData.blockers} onChange={(e) => setFormData({...formData, blockers: e.target.value})} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Hours Worked</label>
            <input type="number" min="0" className="w-full p-2 border rounded-lg" placeholder="Total hours worked" value={formData.hoursWorked} onChange={(e) => setFormData({...formData, hoursWorked: e.target.value})} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea className="w-full p-2 border rounded-lg" placeholder="Any additional comments..." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
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