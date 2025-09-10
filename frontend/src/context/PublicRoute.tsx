import { Navigate } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import type { JSX } from "react";
interface PublicRouteProps {
  children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useUserContext();

  if (user) {
    // Redirect logged-in users away from login page
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
