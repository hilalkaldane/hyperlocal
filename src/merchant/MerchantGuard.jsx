// src/merchant/MerchantGuard.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * POC: determine merchant access.
 * Replace with real auth check (token + role claim).
 *
 * For local dev, set window.__IS_MERCHANT = true in console (or base it on a cookie/localStorage)
 */
export default function MerchantGuard({ children }) {
  // quick dev toggle:
  const isMerchant = Boolean(window.__IS_MERCHANT) || localStorage.getItem("isMerchant") === "true";

  if (!isMerchant) {
    // redirect to a simple page or customer home — merchant will need to login in real app
    return <Navigate to="/" replace />;
  }
  return children;
}
