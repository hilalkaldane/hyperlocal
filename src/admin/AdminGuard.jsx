import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const isAdmin = Boolean(window.__IS_ADMIN) || localStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
