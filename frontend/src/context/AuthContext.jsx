import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${parsedUser.token}`;
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("userInfo");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { 
        email, 
        password 
      });

      
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      
      throw error.response?.data?.message || "Login failed, please try again.";
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};