import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { initData } from "./services/api";   // 👈 import the seeding function

// Customer pages
import Categories from "./users/pages/Categories";
import Discover from "./users/pages/Discover";
import Merchant from "./users/pages/Merchant";
import Profile from "./users/pages/Profile";
import BottomTabBar from "./users/components/BottomTabBar";
import MobileHeader from "./users/components/MobileHeader";

// Merchant pages
import Dashboard from "./merchant/pages/Dashboard";
import CreateCampaign from "./merchant/pages/CreateCampaign";
import RedeemCoupon from "./merchant/pages/RedeemCoupon";
import MerchantBottomTabBar from "./merchant/components/MerchantBottomTabBar";

// Admin pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminBottomTabBar from "./admin/components/AdminBottomTabBar";
import HomePage from "./users/pages/HomePage";

export default function App() {
  const loc = useLocation();
  const [loading, setLoading] = useState(true);

  // Run initData once on mount
  useEffect(() => {
    const boot = async () => {
      try {
        console.log("Init")   // 👈 seeds Supabase if empty
      } catch (err) {
        console.error("App init failed:", err.message);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading initial data...</p>
      </div>
    );
  }

  const isMerchantRoute = loc.pathname.startsWith("/client");
  const isAdminRoute = loc.pathname.startsWith("/admin");

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    >
      {/* Mobile header for customers only */}
      {!isMerchantRoute && !isAdminRoute && <MobileHeader />}

      <main
        className={`${!isMerchantRoute && !isAdminRoute ? "" : ""
          } overflow-auto`}
      >
        <Routes>
          {/* Customer routes */}
          <Route path="/" element={<Categories />} />
          <Route path="/discover/:category?" element={<Discover />} />
          <Route path="/merchant/:id" element={<Merchant />} />
          <Route path="/profile" element={<Profile />} />

          {/* Merchant routes */}
          <Route path="/client" element={<Dashboard />} />
          <Route path="/client/dashboard" element={<Dashboard />} />
          <Route path="/client/create-campaign/" element={<CreateCampaign />} />
          <Route path="/client/redeem-coupon/" element={<RedeemCoupon />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Bottom tab bars by role */}
      {isMerchantRoute ? (
        <MerchantBottomTabBar />
      ) : isAdminRoute ? (
        <AdminBottomTabBar />
      ) : (
        <BottomTabBar />
      )}
    </div>
  );
}
