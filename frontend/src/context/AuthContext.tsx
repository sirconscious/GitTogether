// src/context/AuthContext.tsx
import { createContext, useContext } from "react";

type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook (optional, makes usage cleaner)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
