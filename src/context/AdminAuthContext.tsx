import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Demo credentials (mock auth only — not for production)
export const DEMO_ADMIN = { username: "admin", password: "admin123" };
const STORAGE_KEY = "admin_auth";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const login = (username: string, password: string) => {
    if (username === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
