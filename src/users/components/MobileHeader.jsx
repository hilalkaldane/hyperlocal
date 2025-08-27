import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiMessageCircle, FiBell } from "react-icons/fi";

export default function MobileHeader() {
  const nav = useNavigate();
  const loc = useLocation();

  // center title changes per screen
  const title = {
    "/": "Categories",
    "/discover": "Discover",
    "/profile": "Profile"
  }[loc.pathname.split("/")[1] ? `/${loc.pathname.split("/")[1]}` : "/"] || "Discover";

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
      <div className="flex items-center gap-3">
        {/* optionally back button if not root */}
        <button
          onClick={() => nav(-1)}
          className="p-1 rounded-md"
          title="Back"
          aria-label="Back"
        >
          {/* simple chevron */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <div className="text-md font-semibold">HyperLocal</div>

      <div className="flex items-center gap-3">
        <button onClick={() => nav("/profile")} className="p-1" title="Messages">
          <FiBell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
