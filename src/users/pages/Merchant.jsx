import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { merchantApi, campaignApi } from "../../services/api";

export default function Merchant() {
  const { id } = useParams();
  const [merchant, setMerchant] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeemResult, setRedeemResult] = useState(null);
  const [couponStatus, setCouponStatus] = useState({});

  const categoryImages = {
    electronics: "https://source.unsplash.com/400x300/?electronics,gadgets",
    clothing: "https://images.unsplash.com/photo-1627061560899-1c36a3d1657e",
    restaurants: "https://images.unsplash.com/photo-1652862730768-106cd3cd9ee1",
    fitness: "https://source.unsplash.com/400x300/?fitness,gym",
    books: "https://source.unsplash.com/400x300/?books,library",
    default: "https://source.unsplash.com/400x300/?shopping",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const m = await merchantApi.getMerchant(id);
        setMerchant(m);

        const cs = await campaignApi.listCampaigns(id);
        // Map discount and dates for UI
        const mapped = cs.map(c => ({
          id: c.id,
          name: c.title,
          discountType: c.discount?.includes("%") ? "percentage" : "amount",
          discountValue: c.discount
            ? Number(c.discount.replace(/[^\d]/g, ""))
            : 0,
          startDate: c.created_at || "",
          endDate: c.valid_until || "",
          terms: c.description || "",
        }));
        setCampaigns(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-4">Loading merchant…</div>;
  if (!merchant) return <div className="p-4 text-red-500">Merchant not found</div>;

  const redeem = async (offer) => {
    setRedeemResult({ loading: true });
    try {
      const res = await merchantApi.redeemOffer(merchant.id, offer.id);
      setRedeemResult({ loading: false, res });
    } catch (err) {
      setRedeemResult({ loading: false, res: null });
      alert("Failed to redeem: " + err.message);
    }
  };

  const generateCoupon = async (campaignId) => {
    setCouponStatus((prev) => ({ ...prev, [campaignId]: { loading: true } }));
    try {
      const coupon = await campaignApi.issueCouponForCampaign(campaignId);
      setCouponStatus((prev) => ({ ...prev, [campaignId]: { loading: false, code: coupon.code } }));
    } catch (err) {
      setCouponStatus((prev) => ({ ...prev, [campaignId]: { loading: false, error: err.message } }));
    }
  };

  return (
    <div className="px-4 pb-24 pt-2">
      <div className="mt-2 mb-3">
        <div className="text-xl font-semibold">{merchant.name}</div>
        {(merchant.distanceKm || merchant.tagline) && (
          <div className="text-sm text-gray-500">
            {merchant.distanceKm ? `${merchant.distanceKm} km` : ""}
            {merchant.distanceKm && merchant.tagline ? " • " : ""}
            {merchant.tagline || ""}
          </div>
        )}
      </div>

      <div
        className="w-full h-40 rounded-md mb-4 bg-center bg-cover"
        style={{
          backgroundImage: `url(${merchant.category.image || categoryImages.default})`,
        }}
      />

      {Array.isArray(merchant.offers) && merchant.offers.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Offers</h3>
          <div className="space-y-3">
            {merchant.offers.map((o) => (
              <div key={o.id} className="p-3 border rounded-lg bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{o.title}</div>
                    {o.expires && (
                      <div className="text-sm text-gray-500">Valid until {o.expires}</div>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => redeem(o)}
                      className="px-4 py-2 bg-black text-white rounded-md"
                    >
                      Get Code
                    </button>
                  </div>
                </div>
                {redeemResult?.res && <div className="mt-2 text-sm text-green-700">Code: {redeemResult.res.code}</div>}
                {redeemResult?.loading && <div className="mt-2 text-sm text-gray-500">Getting code…</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(campaigns) && campaigns.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Campaigns</h3>
          <div className="space-y-3">
            {campaigns.map((c) => {
              const status = couponStatus[c.id] || {};
              return (
                <div key={c.id} className="p-3 border rounded-lg bg-white">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-700 mt-1">
                    {c.discountType === "percentage"
                      ? `${c.discountValue}% off`
                      : c.discountType === "amount"
                        ? `₹${c.discountValue} off`
                        : ""}
                  </div>
                  {(c.startDate || c.endDate) && (
                    <div className="text-xs text-gray-500 mt-1">
                      Valid from {c.startDate} to {c.endDate}
                    </div>
                  )}
                  {c.terms && <div className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">{c.terms}</div>}

                  <button
                    onClick={() => generateCoupon(c.id)}
                    disabled={status.loading}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {status.loading ? "Generating..." : "Generate Coupon"}
                  </button>

                  {status.code && <div className="mt-2 text-green-700">Coupon: {status.code}</div>}
                  {status.error && <div className="mt-2 text-red-600">Error: {status.error}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {merchant.details && (
        <div className="mt-6">
          <h4 className="font-semibold">Details</h4>
          <p className="text-sm text-gray-600 mt-2">{merchant.details}</p>
        </div>
      )}
    </div>
  );
}
