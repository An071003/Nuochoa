import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAnalytics } from "../../../modules/Admin/Dashboard/getAnalytics";
import { FaUsers } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBarChart, BsBoxSeam, BsCartCheck } from "react-icons/bs";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;
  if (error)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  // Prepare chart data
  const chartData = {
    labels: analytics.dailySalesData.map((data) => data.date),
    datasets: [
      {
        label: "Daily Sales",
        data: analytics.dailySalesData.map((data) => data.sales),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Daily Sales Data" },
    },
  };

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen">
      <h1 className="text-2xl font-bold text-[#B76E79] mb-6">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full">
        <div className="bg-white shadow-md p-5 rounded-lg text-center">
          <FaUsers className="text-purple-500 text-4xl mb-3 mx-auto" />
          <h2 className="text-lg font-semibold text-gray-700">Users</h2>
          <p className="text-2xl font-bold text-[#B76E79]">{analytics.analyticsData.users}</p>
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg text-center">
          <BsBoxSeam className="text-rose-500 text-4xl mb-3 mx-auto" />
          <h2 className="text-lg font-semibold text-gray-700">Products</h2>
          <p className="text-2xl font-bold text-[#B76E79]">{analytics.analyticsData.products}</p>
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg text-center">
          <BsCartCheck className="text-green-500 text-4xl mb-3 mx-auto" />
          <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
          <p className="text-2xl font-bold text-[#B76E79]">{analytics.analyticsData.totalSales}</p>
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg text-center">
          <BsBarChart className="text-blue-500 text-4xl mb-3 mx-auto" />
          <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
          <p className="text-2xl font-bold text-[#B76E79]">{analytics.analyticsData.totalRevenue}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-md p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Sales Analytics</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
