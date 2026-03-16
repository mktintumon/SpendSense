import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import API from "../api/api"; 

function NavBar() {
  const location = useLocation();
  
  // Routes where the navbar should be hidden
  const hideOnRoutes = ["/login", "/register"];
  
  // If the current path is in the hideOnRoutes array, render nothing
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  const logout = async () => {
    await API.post("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/expenses">
          Expenses
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/anomalies">
          Anomalies
        </Button>
        
        {/* Spacer to push Logout to the right */}
        <Box sx={{ flexGrow: 1 }} />
        
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;