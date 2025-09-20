import { createContext, useEffect, useState } from "react";
import api from "../axios"; // custom axios instance with baseURL

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  // Login function
  const login = async (inputs) => {
    try {
      const res = await api.post("/auth/login", inputs, { withCredentials: true });
      const user = res.data;

      setCurrentUser(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      throw err;
    }
  };

  // Register function
  const register = async (inputs) => {
    try {
      const res = await api.post("/auth/register", inputs, { withCredentials: true });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      sessionStorage.removeItem("user");
    } catch (err) {
      console.error(err);
    }
  };

  // Keep sessionStorage synced with currentUser
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
