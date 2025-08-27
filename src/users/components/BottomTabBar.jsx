import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiPlusSquare, FiInbox, FiUser } from "react-icons/fi";

export default function BottomTabBar() {
  const tabs = [
    { to: "/", label: "Home", icon: <FiHome /> },
    { to: "/discover", label: "Search", icon: <FiSearch /> },
    { to: "/profile", label: "Profile", icon: <FiUser /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 flex items-center justify-around z-40">
      {tabs.map((t) => (
        <NavLink key={t.label} to={t.to} className="flex flex-col items-center text-xs">
          <div className="w-4 h-4">{t.icon}</div>
          <span className="mt-0.5">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
