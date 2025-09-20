// import { createContext, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const storedUser = sessionStorage.getItem("user");

//   const [currentUser, setCurrentUser] = useState(() => {
//     try {
//       return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
//     } catch {
//       return null;
//     }
//   });

//   const login = async (inputs) => {
//     try {
//       const res = await axios.post("/api/auth/login", inputs, { withCredentials: true });
//       if (res.data) {
//         setCurrentUser(res.data);
//         sessionStorage.setItem("user", JSON.stringify(res.data));
//       }
//       return res.data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post("/api/auth/logout", {}, { withCredentials: true });
//       setCurrentUser(null);
//       sessionStorage.removeItem("user");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/api/auth/login", inputs);
    // ensure we save only user data, not axios wrapper
    const user = res.data;
    setCurrentUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
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
