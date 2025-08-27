import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { FiBarChart2, FiPlusSquare, FiCheckSquare } from "react-icons/fi";
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export default function MerchantBottomTabBar() {
  const query = useQuery();
  const merchantId = query.get('merchantId');
  const tabs = [
    { to: `/client/dashboard?merchantId=${merchantId}`, label: "Dashboard", icon: <FiBarChart2 /> },
    { to: `/client/create-campaign?merchantId=${merchantId}`, label: "Create", icon: <FiPlusSquare /> },
    { to: `/client/redeem-coupon?merchantId=${merchantId}`, label: "Validate", icon: <FiCheckSquare /> },
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
