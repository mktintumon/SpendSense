import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import ExpenseList from "./components/ExpenseList";
// import ExpenseForm from "./components/ExpenseForm";
// import CsvUpload from "./components/CsvUpload";
import Dashboard from "./components/Dashboard";
import AnomalyScreen from "./components/AnomalyScreen";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Expenses</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/anomalies">Anomalies</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={
            <>
              {/* <ExpenseForm />
              <CsvUpload /> */}
              <ExpenseList />
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/anomalies" element={<AnomalyScreen />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;