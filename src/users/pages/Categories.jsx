import React, { useEffect, useState } from "react";
import { campaignApi, categoryApi, merchantApi } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  const [merchantsMap, setMerchantsMap] = useState({}); // merchantId -> merchant data

  const nav = useNavigate();

  useEffect(() => {
    categoryApi.listCategories().then((c) => {
      setCats(c);
      setLoadingCats(false);
    });

    campaignApi.listAllCampaigns().then(async (camps) => {
      const sorted = camps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latest = sorted.slice(0, 3);
      setCampaigns(latest);
      console.log("campaigns ")
      console.log(latest)
      // Fetch merchant details for campaigns
      const merchantIds = [...new Set(latest.map((c) => c.merchant_id))];
      const merchantPromises = merchantIds.map((id) => merchantApi.getMerchant(id));
      const merchants = await Promise.all(merchantPromises);
      console.log("merchants ")
      console.log(merchants)
      const merchantMap = {};
      merchants.forEach((m) => {
        if (m) merchantMap[m.id] = m;
      });
      setMerchantsMap(merchantMap);

      setLoadingCampaigns(false);
    });
  }, []);

  const SkeletonCard = () => (
    <div className="animate-pulse flex flex-col p-4 rounded-lg border border-gray-100 bg-white shadow-sm mb-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  );

  return (
    <div className="px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mt-4 mb-6 text-gray-900">Categories</h2>

      {loadingCats ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => nav(`/discover/${c.id}`)}
              className="flex flex-col items-start p-4 rounded-lg border border-gray-100 bg-white shadow-sm
                         hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition"
              aria-label={`Discover category ${c.label}`}
            >
              <div className="text-lg font-semibold text-gray-900 mt-1">{c.label}</div>
              <div className="text-xs text-gray-600 mt-1">Nearby merchants & deals</div>
            </button>
          ))}
        </div>
      )}

      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Trending Deals</h3>
        {loadingCampaigns ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : campaigns.length === 0 ? (
          <p className="text-gray-600">No trending deals at the moment.</p>
        ) : (
          <div className="space-y-4">
            {campaigns.map((camp) => {
              const merchant = merchantsMap[camp.merchant_id];
              return (
                <div
                  key={camp.id}
                  className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => nav(`/merchant/${camp.merchant_id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") nav(`/client/create-campaign/${camp.merchant_id}`);
                  }}
                  aria-label={`View campaign ${camp.title} by merchant ${merchant?.name || "unknown"}`}
                >
                  <div className="font-semibold text-gray-900 text-lg">{merchant?.name || "Loading merchant..."}</div>
                  <div className="text-gray-700">{camp.discount}</div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
