import React from "react";
import { NavLink } from "react-router-dom";
import { FiUserPlus, FiRefreshCcw } from "react-icons/fi";

export default function AdminBottomTabBar() {
  const tabs = [
    { to: "/admin/create-merchant", label: "Create", icon: <FiUserPlus /> },
    { to: "/admin/reset", label: "Reset", icon: <FiRefreshCcw /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 flex items-center justify-around z-40">
      {tabs.map((t) => (
        <NavLink
          key={t.label}
          to={t.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-blue-600" : "text-gray-500"}`
          }
        >
          <div className="w-5 h-5">{t.icon}</div>
          <span className="mt-0.5">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
