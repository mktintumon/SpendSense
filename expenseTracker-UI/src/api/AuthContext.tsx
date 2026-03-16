import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      await API.get("/auth/check"); 
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    // Added checkAuth here ->  to use in other components like Login to trigger a re-check after login/logout
    <AuthContext.Provider value={{ authenticated, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);