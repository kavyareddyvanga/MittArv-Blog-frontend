import { createContext, useEffect, useState } from "react";
import api from "../axios";  // our custom axios instance with baseURL

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await api.post("/auth/login", inputs); 
    const user = res.data;
    setCurrentUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const logout = async () => {
    await api.post("/auth/logout"); 
    setCurrentUser(null);
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
