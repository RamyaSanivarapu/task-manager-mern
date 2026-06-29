import { useState } from "react";
import AXIOS from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AXIOS.post("/auth/forgot-password", { email });
      navigate(`/reset-password/${res.data.token}`);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card sx={{ width: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Forgot Password</Typography>

          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter your email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Continue
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

export default ForgotPassword;
