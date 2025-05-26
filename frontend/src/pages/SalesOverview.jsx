

import { useState, useRef } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const SalesOverview = ({ data }) => {
  const [viewMode, setViewMode] = useState("Monthly")
  const chartRef = useRef(null)

  // ✅ Fallback if data or data.monthly is undefined
  const monthlyData = data?.monthly || []

  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Sales count",
        data: monthlyData.map((item) => item.salesCount),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.1)",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        label: "Products sold",
        data: monthlyData.map((item) => item.productsSold),
        borderColor: "#334155",
        backgroundColor: "rgba(51, 65, 85, 0.1)",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value) => value + "k",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              viewMode === "Monthly" ? "bg-green-100 text-green-800" : "text-gray-500"
            }`}
            onClick={() => setViewMode("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              viewMode === "Weekly" ? "bg-green-100 text-green-800" : "text-gray-500"
            }`}
            onClick={() => setViewMode("Weekly")}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-600">Sales count</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-700 mr-2"></div>
          <span className="text-sm text-gray-600">Products sold</span>
        </div>
      </div>

      <div className="h-64">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}

export default SalesOverview
