import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, CircularProgress } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api/api";
import { useSnackbar } from "notistack";
import { useAuth } from "../api/AuthContext";

function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { authenticated, checkAuth } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
          setLoading(true);

          if (!form.email.trim()) {
            enqueueSnackbar("Email is blank", { variant: "warning" });
            return; 
          }

          if (!form.password.trim()) {
            enqueueSnackbar("Password is blank", { variant: "warning" });
            return;
          }
          
          await API.post("/auth/login", form);

          enqueueSnackbar("Login successful", { variant: "success" });

          // Calling the context function to update global state for refreshing page
          await checkAuth();

          navigate("/");
        } catch (error) {
            enqueueSnackbar("Login failed", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    //redirect if already logged in
    if (authenticated) {
        return <Navigate to="/" />;
    }

    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Paper sx={{ p: 4, width: 350 }}>
          <Typography variant="h5" mb={3}>
            Login
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Email" name="email" onChange={handleChange} />

            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />

            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            {/* Register Button */}
            <Button
              variant="text"
              onClick={() => navigate("/register")}
              sx={{ textTransform: "none" }} // Keeps the text from being all-caps
            >
              Don't have an account? Register
            </Button>
          </Box>
        </Paper>
      </Box>
    );
}

export default Login;