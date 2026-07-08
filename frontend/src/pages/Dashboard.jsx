import { useEffect, useState } from "react";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";

const Dashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports/dashboard");
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        alert("Failed to fetch reports. Please login again.");
      }
    };
    fetchReports();
  }, []);

  return (
    <AuthLayout title="Team Dashboard" subtitle="View all team member reports" isDashboard={true}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto min-w-[1200px]">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-200">
              <th className="p-4 text-slate-700 font-bold border">Member</th>
              <th className="p-4 text-slate-700 font-bold border">Week</th>
              <th className="p-4 text-slate-700 font-bold border">Project</th>
              <th className="p-4 text-slate-700 font-bold border">Completed</th>
              <th className="p-4 text-slate-700 font-bold border">Planned</th>
              <th className="p-4 text-slate-700 font-bold border">Blockers</th>
              <th className="p-4 text-slate-700 font-bold border">Hours</th>
              <th className="p-4 text-slate-700 font-bold border">Status</th>
              <th className="p-4 text-slate-700 font-bold border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report._id} className="border-b hover:bg-slate-50">
                  <td className="p-4 border text-slate-600">{report.user?.name || "N/A"}</td>
                  <td className="p-4 border text-slate-600 whitespace-nowrap">{report.weekRange}</td>
                  <td className="p-4 border text-slate-600">{report.project?.name || report.project}</td>
                  
                  {/* දිගු පෙළක් ඇති තීරු සඳහා whitespace-normal සහ break-words යොදා ඇත */}
                  <td className="p-4 border text-slate-600 whitespace-normal break-words min-w-[150px]">{report.tasksCompleted}</td>
                  <td className="p-4 border text-slate-600 whitespace-normal break-words min-w-[150px]">{report.tasksPlanned}</td>
                  <td className="p-4 border text-slate-600 whitespace-normal break-words min-w-[150px]">{report.blockers}</td>
                  
                  <td className="p-4 border text-slate-600 text-center">{report.hoursWorked || "-"}</td>
                  <td className="p-4 border">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      report.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {report.status || "N/A"}
                    </span>
                  </td>
                  
                  {/* Notes තීරුව සඳහා ද වෙනස්කම් සිදු කර ඇත */}
                  <td className="p-4 border text-slate-600 whitespace-normal break-words min-w-[200px]">
                    {report.notes || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center text-slate-400">No reports found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AuthLayout>
  );
};

export default Dashboard;