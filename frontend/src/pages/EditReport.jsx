import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        
        // 1. වාර්තාවේ දත්ත ලබා ගැනීම
        const reportRes = await axios.get(`http://localhost:5000/api/reports/${id}`, config);
        
        setFormData({
          weekRange: reportRes.data.weekRange || "",
          project: reportRes.data.project?._id || reportRes.data.project || "",
          tasksCompleted: reportRes.data.tasksCompleted || "",
          tasksPlanned: reportRes.data.tasksPlanned || "",
          blockers: reportRes.data.blockers || "",
          hoursWorked: reportRes.data.hoursWorked || "",
          notes: reportRes.data.notes || "",
        });
        
        // 2. ව්‍යාපෘති ලැයිස්තුව ලබා ගැනීම
        const projectRes = await axios.get("http://localhost:5000/api/projects", config);
        setProjects(projectRes.data);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    if (user?.token && id) fetchData();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // අමතර ආරක්ෂාව: සෘණ අගයන් වැළැක්වීම
    if (formData.hoursWorked < 0) {
      alert("Hours worked cannot be negative!");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.put(`http://localhost:5000/api/reports/${id}`, formData, config);
      alert("Report updated successfully!");
      navigate("/my-reports");
    } catch (error) {
      console.error("Error updating report", error);
      alert("Failed to update report.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Edit Weekly Report</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Week Range</label>
            <input type="text" value={formData.weekRange} onChange={(e) => setFormData({...formData, weekRange: e.target.value})} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Project</label>
            <select value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" required>
              <option value="">Select a Project</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>{proj.name}</option>
              ))}
            </select>
          </div>


          {/* ඉතිරි fields එලෙසම තබා ගන්න */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Tasks Completed</label>
            <textarea value={formData.tasksCompleted} onChange={(e) => setFormData({...formData, tasksCompleted: e.target.value})} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" rows="3" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Tasks Planned</label>
            <textarea value={formData.tasksPlanned} onChange={(e) => setFormData({...formData, tasksPlanned: e.target.value})} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" rows="3" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Blockers</label>
            <input type="text" value={formData.blockers} onChange={(e) => setFormData({...formData, blockers: e.target.value})} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" />
          </div>

           <div>
            <label className="block text-sm font-medium text-slate-700">Hours Worked</label>
            <input 
              type="number" 
              min="0" // සෘණ අගයන් යාම වැළැක්වීමට මෙය එකතු කරන්න
              value={formData.hoursWorked} 
              onChange={(e) => setFormData({...formData, hoursWorked: e.target.value})} 
              className="w-full mt-1 p-2 border border-slate-300 rounded-lg" 
              placeholder="e.g., 40" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full mt-1 p-2 border border-slate-300 rounded-lg" rows="2" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold transition">
            Update Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReport;