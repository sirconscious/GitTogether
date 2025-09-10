import { Navigate } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import type { JSX } from "react";
interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useUserContext();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return children; // User is authenticated, render the page
}
