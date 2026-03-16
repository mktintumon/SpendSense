import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, CircularProgress } from "@mui/material";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function Register(){

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleChange=(e:any)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleRegister = async ()=>{

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

      await API.post("/auth/register", form);

      enqueueSnackbar("Registration successful", { variant: "success" });

      navigate("/login");
    } catch (err) {
    } finally {
      setLoading(false);
    }

  }

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={3}>
          Register
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Email" name="email" onChange={handleChange} />

          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />


          <Button variant="contained" onClick={handleRegister} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          {/* Login Button */}
          <Button
            variant="text"
            onClick={() => navigate("/login")}
            sx={{ textTransform: "none" }} // Keeps the text from being all-caps
          >
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;