import { createContext } from "react";

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
