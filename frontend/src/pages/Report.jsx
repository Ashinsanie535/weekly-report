import { useState } from "react";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";

const Report = () => {
  const [formData, setFormData] = useState({
    weekRange: "",
    project: "",
    tasksCompleted: "",
    tasksPlanned: "",
    blockers: "",
    hoursWorked: "", // එකතු කරන ලදී
    notes: "",       // එකතු කරන ලදී
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Status එක backend එකට යැවීමට object එකට එක් කරන්න
    const reportData = {
      ...formData,
      status: "submitted" // අසائنමන්ට් එකේ අවශ්‍යතාවය අනුව Status එක
    };

    try {
      await axios.post("http://localhost:5000/api/reports", reportData);
      alert("Report submitted successfully!");
      
      // Form එක reset කරන්න
      setFormData({
        weekRange: "", project: "", tasksCompleted: "", 
        tasksPlanned: "", blockers: "", hoursWorked: "", notes: "" 
      });
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      alert("Failed to submit report. Please check the console.");
    }
  };

  return (
    <AuthLayout title="Submit Weekly Report" subtitle="Please fill in your progress">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Week Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Week Range</label>
          <input type="text" className="w-full p-2 border rounded" 
            value={formData.weekRange}
            onChange={(e) => setFormData({...formData, weekRange: e.target.value})} required />
        </div>
        
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Project Name/ID</label>
          <input type="text" className="w-full p-2 border rounded" 
            value={formData.project}
            onChange={(e) => setFormData({...formData, project: e.target.value})} required />
        </div>

        {/* Tasks Completed */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Tasks Completed</label>
          <textarea className="w-full p-2 border rounded" 
            value={formData.tasksCompleted}
            onChange={(e) => setFormData({...formData, tasksCompleted: e.target.value})} required />
        </div>

        {/* Tasks Planned */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Tasks Planned</label>
          <textarea className="w-full p-2 border rounded" 
            value={formData.tasksPlanned}
            onChange={(e) => setFormData({...formData, tasksPlanned: e.target.value})} required />
        </div>

        {/* Blockers */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Blockers</label>
          <input type="text" className="w-full p-2 border rounded" 
            value={formData.blockers}
            onChange={(e) => setFormData({...formData, blockers: e.target.value})} />
        </div>

        {/* Hours Worked (Optional) */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Hours Worked</label>
          <input type="number" className="w-full p-2 border rounded" 
            value={formData.hoursWorked}
            onChange={(e) => setFormData({...formData, hoursWorked: e.target.value})} />
        </div>

        {/* Notes (Optional) */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea className="w-full p-2 border rounded" 
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Submit Report
        </button>
      </form>
    </AuthLayout>
  );
};

export default Report;