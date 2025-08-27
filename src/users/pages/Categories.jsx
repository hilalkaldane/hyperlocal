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
  const fetchData = async () => {
    try {
      // 🚀 Fetch categories + campaigns in parallel
      const [c, camps] = await Promise.all([
        categoryApi.listCategories(),
        campaignApi.listAllCampaigns(),
      ]);

      // Sort & slice campaigns
      const sorted = camps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latest = sorted.slice(0, 5);
      setCampaigns(latest);

      // Fetch merchants
      const merchantIds = [...new Set(latest.map((c) => c.merchant_id))];
      const merchants = await Promise.all(
        merchantIds.map((id) => merchantApi.getMerchant(id))
      );

      // Map merchants + attach category info
      const merchantMap = {};
      merchants.forEach((m) => {
        if (m) {
          const category = c.find((cat) => cat.id === m.category_id);
          merchantMap[m.id] = {
            ...m,
            categoryLabel: category ? category.label : null,
            categoryImage: category ? category.image : null,
          };
        }
      });

      setCats(c);
      setMerchantsMap(merchantMap);
    } catch (err) {
      console.error("Error loading data", err);
    } finally {
      setLoadingCats(false);
      setLoadingCampaigns(false);
    }
  };

  fetchData();
}, []);


  const SkeletonCard = () => (
    <div className="animate-pulse flex flex-col p-4 rounded-lg border border-gray-100 bg-white shadow-sm mb-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  );

  return (

    <div className="max-w-4xl mx-auto pb-16 no-scrollbar">
      <div class="flex gap-3 pl-3 pb-3 overflow-x-auto no-scrollbar">
        {cats.map((c) => (
          <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f2f0f4] pl-4 pr-4">
            <p class="text-[#131118] text-sm font-medium leading-normal">{c.label}</p>
          </div>
        ))}
      </div>
      <section className="mt-2">
        <h3 className="px-4 text-xl font-semibold text-gray-900">Trending Deals</h3>

        {/* <div class="p-4">
          <div class="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div class="flex flex-col gap-1 flex-[2_2_0px]">
              <p class="text-[#6e6388] text-sm font-normal leading-normal">10% off</p>
              <p class="text-[#131118] text-base font-bold leading-tight">The Daily Grind</p>
              <p class="text-[#6e6388] text-sm font-normal leading-normal">Coffee &amp; Pastries · 0.3 mi</p>
            </div>
            <div
              class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpyJxiWtrflH22fHaK5T2E7W-CmIGmHOtuQ7XsTcYxbQZVGIRLmxjU7_OumXP2-REIJWYIxPOZBEGbIlvnGb2ppD0bG2_HFzMz6syDz3uxlcHgIj7N5459_3AYRo3cDpSC1HqHKEt3H7d0XCNNZto1RBVsgtuEnOjxB9eC95k6iEUCXvAguv7_L7SlU-kNeG23x9fI4cUGkOmyRAjRQ7dSTPaDuKdZwvwYMKzVwPyDw81EJ4Ap0GwvVVR8QinhuAUKrxC3Ks6_i48")`
              }}
            ></div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div class="flex flex-col gap-1 flex-[2_2_0px]">
              <p class="text-[#6e6388] text-sm font-normal leading-normal">10% off</p>
              <p class="text-[#131118] text-base font-bold leading-tight">The Daily Grind</p>
              <p class="text-[#6e6388] text-sm font-normal leading-normal">Coffee &amp; Pastries · 0.3 mi</p>
            </div>
            <div
              class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpyJxiWtrflH22fHaK5T2E7W-CmIGmHOtuQ7XsTcYxbQZVGIRLmxjU7_OumXP2-REIJWYIxPOZBEGbIlvnGb2ppD0bG2_HFzMz6syDz3uxlcHgIj7N5459_3AYRo3cDpSC1HqHKEt3H7d0XCNNZto1RBVsgtuEnOjxB9eC95k6iEUCXvAguv7_L7SlU-kNeG23x9fI4cUGkOmyRAjRQ7dSTPaDuKdZwvwYMKzVwPyDw81EJ4Ap0GwvVVR8QinhuAUKrxC3Ks6_i48")`
              }}
            ></div>
          </div>
        </div> */}
        {loadingCampaigns ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : campaigns.length === 0 ? (
          <p className="text-gray-600">No trending deals at the moment.</p>
        ) : (
          <div>
            {campaigns.map((camp) => {
  const merchant = merchantsMap[camp.merchant_id];
  return (
    <div key={camp.id} className="p-4 pb-2 pt-2">   {/* ✅ key moved here */}
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-1 flex-[2_2_0px]">
          <p className="text-[#6e6388] text-sm font-normal leading-normal">{camp.discount}</p>
          <p
            onClick={() => nav(`/merchant/${camp.merchant_id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                nav(`/client/create-campaign/${camp.merchant_id}`);
              }
            }}
            aria-label={`View campaign ${camp.title} by merchant ${merchant?.name || "unknown"}`}
            className="text-[#131118] text-base font-bold leading-tight"
          >
            {merchant?.name || "Loading merchant..."}
          </p>
          <p className="text-[#6e6388] text-sm font-normal leading-normal">
            {merchant?.categoryLabel}
          </p>
        </div>
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
          style={{
            backgroundImage: `url("${merchant.categoryImage}")`
          }}
        ></div>
      </div>
    </div>
  );
})}

          </div>
        )}
      </section>
      <section className="mt-2">
        <h3 className="px-4 mb-2 text-xl font-semibold text-gray-900">Categories</h3>

        {loadingCats ? (
          <div className="grid grid-cols-2 gap-4 px-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-4">
            {cats.map((c) => (
              <button
                key={c.id}
                onClick={() => nav(`/discover/${c.id}`)}
                className="flex flex-col items-start p-4 rounded-xl border border-gray-100 bg-white shadow-sm
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
      </section>

    </div>
  );
}
