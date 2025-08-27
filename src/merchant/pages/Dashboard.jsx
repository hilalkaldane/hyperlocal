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
    console.log("Dashboard"+ ""+ merchantId)
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
    <div className="p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-3">Issued vs Redeemed (Past 10 Days)</h3>
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
}
