import React, { useEffect, useState } from "react";
import { merchantApi } from "../../services/api";
import { useLocation, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Dashboard() {

  const query = useQuery();
  const merchantId = query.get('merchantId');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log("Dashboard" + "" + merchantId)
    if (!merchantId) return;
    setLoading(true);
    try {
      const res = await merchantApi.dashboardMonthly(merchantId);
      setChartData(res);
    } catch (err) {
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [merchantId]);

  if (loading) return <div className="p-4">Loading chart…</div>;
  if (!chartData) return <div className="p-4">No data</div>;

  const totalIssued = chartData.issued.reduce((a, b) => a + b, 0);
  const totalRedeemed = chartData.redeemed.reduce((a, b) => a + b, 0);

  const series = [
    { name: "Issued", data: chartData.issued },
    { name: "Redeemed", data: chartData.redeemed }
  ];

  const options = {
    chart: { type: "line", height: 300 },
    xaxis: { categories: chartData.dates },
    colors: ["#A78BFA", "#60A5FA"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    grid: { borderColor: "#eee" },
    tooltip: { shared: true }
  };

  return (
    <div>
      <div className="p-4 border rounded-lg w-full max-w-md">
        <div className="text-gray-500 text-sm mb-2">Totals (Last 10 Days)</div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center flex-1">
            <span className="text-sm font-medium text-gray-600">Issued</span>
            <span className="text-2xl font-bold text-purple-600">{totalIssued}</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-sm font-medium text-gray-600">Redeemed</span>
            <span className="text-2xl font-bold text-blue-600">{totalRedeemed}</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border rounded mx-auto min-h-md">
        <h3 className="text-lg font-semibold mb-3">Issued vs Redeemed (Past 10 Days)</h3>
        <Chart options={options} series={series} type="line" height={300} />
      </div>
    </div>
  );
}
