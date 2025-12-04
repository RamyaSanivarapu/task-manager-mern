import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @typedef {Object} User
 * @property {"admin" | "user"} role - The role of the user.
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User | null} user - The current user.
 * @property {() => void} logout - Function to log out the user.
 */

/** @type {React.Context<AuthContextType>} */
export const AuthContext = createContext({
  user: null,
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
