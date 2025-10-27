import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  children: React.ReactNode;
  adminEnabled?: boolean;
};

function ProtectedRoute({ children, adminEnabled }: Props) {
  const { state } = useAuth();
  const user = state.loggedInUser;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminEnabled && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
