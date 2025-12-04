import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AXIOS from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AXIOS.post("/auth/signin", { email, password });

      login(res.data.user, res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card sx={{ width: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Signin
            </Button>
          </form>

          <Typography sx={{ mt: 2 }}>
            New user? <Link to="/signup">Signup here</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;
