import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // grabbing token from my auth context
  const auth = useContext(AuthContext);

  // if no auth or no token, kick user to login page
  if (!auth || !auth.token) {
    return <Navigate to="/auth" replace />;
  }

  // otherwise let them see the page they asked for
  return <>{children}</>;
}
