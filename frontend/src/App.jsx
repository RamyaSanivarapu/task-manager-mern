import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App({ mode, toggleMode }) {
  const { user, logout } = useContext(AuthContext);


  return (
    <>
      {/* Global App Bar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section - App Title */}
          <Typography variant="h6" component="div">
            Task Manager
          </Typography>

          {/* Right Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* Show Role */}
            {user && (
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "yellow" }}>
                {user.role === "admin" ? "Admin" : "User"}
              </Typography>
            )}
            {/* Theme Toggle Button */}
            <IconButton color="inherit" onClick={toggleMode}>
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            {/* Logout Button (only when logged in) */}
            {user && (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
