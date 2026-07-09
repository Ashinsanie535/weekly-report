import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter සඳහා අවශ්‍ය States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("All");
  const [filterDate, setFilterDate] = useState(""); // Date filter එක සඳහා state එක

  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.token) return;

      try {
        setLoading(true);
        const config = { 
            headers: { Authorization: `Bearer ${user.token}` } 
        };
        
        const res = await axios.get("http://localhost:5000/api/reports/dashboard", config);
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  // Filter Logic
  const filteredReports = reports.filter((report) => {
    const matchesName = report.user?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === "All" || report.project?.name === filterProject;
    
    // Date Range Validation & Filtering Logic
    const matchesDate = !filterDate || (() => {
      if (!report.weekRange) return false;
      
      // "DD/MM/YYYY - DD/MM/YYYY" ආකෘතිය වෙන් කර ගැනීම
      const dateParts = report.weekRange.split(" - ");
      if (dateParts.length !== 2) return false;

      const parseDateStr = (str) => {
        const [d, m, y] = str.trim().split("/");
        return new Date(`${y}-${m}-${d}`);
      };

      const startDate = parseDateStr(dateParts[0]);
      const endDate = parseDateStr(dateParts[1]);
      const selectedDate = new Date(filterDate);

      // වෙලාවන් ශුන්‍ය කර දින පමණක් සැසඳීම
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      // තෝරාගත් දිනය Week Range එක ඇතුළත පවතීදැයි බැලීම
      return selectedDate >= startDate && selectedDate <= endDate;
    })();

    return matchesName && matchesProject && matchesDate;
  });

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <AuthLayout title="Team Dashboard" subtitle="View all team member reports" isDashboard={true}>
      
      {/* Filtering UI Controls */}
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by member name..." 
          className="p-2 border rounded-lg w-full md:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="p-2 border rounded-lg w-full md:w-1/4"
          onChange={(e) => setFilterProject(e.target.value)}
        >
          <option value="All">All Projects</option>
          {[...new Set(reports.map(r => r.project?.name).filter(Boolean))].map(proj => (
            <option key={proj} value={proj}>{proj}</option>
          ))}
        </select>

        {/* Date Picker Input */}
        <input 
          type="date" 
          value={filterDate}
          className="p-2 border rounded-lg w-full md:w-1/4"
          onChange={(e) => setFilterDate(e.target.value)} 
        />
        
        {/* දින පෙරහන ඉවත් කිරීමට Clear බටන් එකක් (UX වැඩි දියුණු කිරීමට) */}
        {filterDate && (
          <button 
            onClick={() => setFilterDate("")} 
            className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-300 transition"
          >
            Clear Date
          </button>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto min-w-[1200px]">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-200">
              <th className="p-4 border">Member</th>
              <th className="p-4 border">Week Range</th>
              <th className="p-4 border">Project</th>
              <th className="p-4 border">Tasks Completed</th>
              <th className="p-4 border">Tasks Planned</th>
              <th className="p-4 border">Blockers</th>
              <th className="p-4 border">Hours Worked</th>
              <th className="p-4 border">Notes</th>
              <th className="p-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report._id} className="border-b hover:bg-slate-50">
                  <td className="p-4 border">{report.user?.name || "N/A"}</td>
                  <td className="p-4 border">{report.weekRange}</td>
                  <td className="p-4 border font-medium">{report.project?.name || "N/A"}</td>
                  <td className="p-4 border">{report.tasksCompleted}</td>
                  <td className="p-4 border">{report.tasksPlanned}</td>
                  <td className="p-4 border">{report.blockers}</td>
                  <td className="p-4 border text-center">{report.hoursWorked || 0}</td>
                  <td className="p-4 border">{report.notes || "-"}</td>
                  <td className="p-4 border">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs uppercase font-bold">
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center text-slate-500">No matching reports found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AuthLayout>
  );
};

export default Dashboard;