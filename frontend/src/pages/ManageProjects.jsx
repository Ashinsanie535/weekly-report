import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ManageProjects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const [projRes, userRes] = await Promise.all([
        axios.get("http://localhost:5000/api/projects", config),
        axios.get("http://localhost:5000/api/auth/users", config) 
      ]);
      
      setProjects(projRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (user?.token) fetchData();
  }, [user]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      // Edit කිරීමේදී teamMembers වලට ID ලැයිස්තුවක් යැවීම සහතික කිරීම
      const projectData = { name, description, teamMembers };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/projects/${editingId}`, projectData, config);
        alert("Project updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/projects", projectData, config);
        alert("Project added successfully!");
      }
      setName(""); setDescription(""); setTeamMembers([]); setEditingId(null);
      fetchData();
    } catch (error) { alert("Operation failed!"); } 
    finally { setLoading(false); }
  };

  const handleEdit = (p) => {
    setName(p.name);
    setDescription(p.description);
    // Edit කිරීමේදී පවතින සාමාජිකයින්ගේ IDs පමණක් set කිරීම
    setTeamMembers(p.teamMembers.map(m => m._id) || []);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        fetchData();
      } catch (error) { alert("Failed to delete."); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
        
        <form onSubmit={handleAddProject} className="bg-white p-6 rounded-xl border border-slate-200 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Project" : "Create New Project"}</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 border rounded-lg" required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded-lg" />
            
            <label className="font-semibold">Assign Team Members (Hold Ctrl to select multiple)</label>
            <select multiple className="p-3 border rounded-lg h-24" value={teamMembers} onChange={(e) => setTeamMembers(Array.from(e.target.selectedOptions, option => option.value))}>
              {users && users.map(u => (<option key={u._id} value={u._id}>{u.name}</option>))}
            </select>

            <button type="submit" disabled={loading} className="bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
              {loading ? "Processing..." : editingId ? "Update Project" : "Add Project"}
            </button>
          </div>
        </form>

        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p._id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-slate-600">{p.description}</p>
                {/* මෙතැනදී සාමාජිකයින්ගේ නම් ලැයිස්තුව පෙන්වයි */}
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Team: {p.teamMembers.length > 0 ? p.teamMembers.map(m => m.name).join(", ") : "No members assigned"}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="text-blue-600 font-semibold">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-600 font-semibold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProjects;