import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyReports = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReports = async () => {
      if (!user?.token) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        // Backend එකෙන් දත්ත ලබා ගැනීම
        const res = await axios.get("http://localhost:5000/api/reports/my-reports", config);
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports", error);
        alert("Failed to load reports. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">My Weekly Reports</h1>
        
        {loading ? (
          <p className="text-center py-10 text-slate-600">Loading your reports...</p>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-700 text-sm">
                  <th className="p-3">Week Range</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Tasks Completed</th>
                  <th className="p-3">Tasks Planned</th>
                  <th className="p-3">Blockers</th>
                  <th className="p-3">Hours Worked</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="border-b hover:bg-slate-50 text-slate-600">
                    <td className="p-3 text-sm">{report.weekRange}</td>
                    {/* මෙතැනදී project නම පරීක්ෂා කර පෙන්වයි */}
                    <td className="p-3 text-sm font-medium">
                      {report.project && typeof report.project === 'object' ? report.project.name : "N/A"}
                    </td>
                    <td className="p-3 text-sm">{report.tasksCompleted}</td>
                    <td className="p-3 text-sm">{report.tasksPlanned}</td>
                    <td className="p-3 text-sm">{report.blockers}</td>
                    <td className="p-3 text-sm">{report.hoursWorked}</td>
                    <td className="p-3 text-sm">{report.notes || "-"}</td>
                    <td className="p-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold uppercase">
                        {report.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <button 
                        onClick={() => navigate(`/edit-report/${report._id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {reports.length === 0 && (
              <p className="text-center py-8 text-slate-500">No reports submitted yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;