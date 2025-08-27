import React from "react";
import { MERCHANTS } from "../../data/sampleData";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="px-4 pb-24 pt-4">
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 bg-gray-200 rounded-full" />
        <div className="text-lg font-semibold">John Doe</div>
        <div className="text-sm text-gray-500">Member since 2023</div>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold">Coupons</h3>
        <div className="mt-3 space-y-2">
          {MERCHANTS.slice(0,2).map((m) => (
            <Link to={`/merchant/${m.id}`} key={m.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-md" />
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.distanceKm} km</div>
                </div>
              </div>
              <div>›</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold">Preferences</h3>
        <div className="mt-2 p-3 bg-white rounded-lg border">
          <div className="text-sm">Manage categories, notification preferences, and coupon alerts.</div>
        </div>
      </div>
    </div>
  );
}
