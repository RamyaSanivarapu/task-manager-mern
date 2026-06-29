import { useState } from "react";
import AXIOS from "../api/axiosInstance";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, TextField, Card, CardContent, Typography, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError("Passwords do not match");

    try {
      const res = await AXIOS.post(`/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setError("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card sx={{ width: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Reset Password</Typography>

          {message && <Typography color="primary" sx={{ mb: 2 }}>{message} Redirecting...</Typography>}
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              fullWidth
              margin="normal"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((p) => !p)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {confirm && (
              <Typography variant="caption" color={password === confirm ? "success.main" : "error"}>
                {password === confirm ? "✔ Passwords match" : "✘ Passwords do not match"}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Reset Password
            </Button>
          </form>

          <Typography sx={{ mt: 2 }}>
            <Link to="/">Back to Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;
