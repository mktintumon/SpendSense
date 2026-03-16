import { Navigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

function ProtectedRoute({ children }: { children: any }) {
  
  const { authenticated, loading } = useAuth();

  if (loading) return null;

  if (!authenticated) {
    // 'replace' prevents them from going back to the protected route via the browser's back button
    return <Navigate to="/login" replace />; 
  }

  return children;
}

export default ProtectedRoute;