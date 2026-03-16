import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import ExpenseList from "./components/ExpenseList";

import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar"; // Import the new NavBar
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnomalyScreen from "./pages/AnomalyScreen";
import { AuthProvider } from "./api/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      
        <NavBar />

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ExpenseList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/anomalies"
              element={
                <ProtectedRoute>
                  <AnomalyScreen />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;