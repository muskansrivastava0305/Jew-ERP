
import { useRef } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const CreditStatus = ({ data }) => {
  const chartRef = useRef(null)

  // Show loading or fallback UI if data is missing
  if (!data || data.paid == null || data.pending == null || data.credit == null) {
    return <div>Loading credit status data...</div>
  }

  const chartData = {
    labels: ["Paid", "Pending", "Credit"],
    datasets: [
      {
        data: [data.paid, data.pending, data.credit],
        backgroundColor: [
          "rgba(74, 222, 128, 0.8)",
          "rgba(250, 204, 21, 0.8)",
          "rgba(74, 153, 211, 0.8)",
        ],
        borderColor: [
          "rgba(74, 222, 128, 1)",
          "rgba(250, 204, 21, 1)",
          "rgba(74, 153, 211, 1)",
        ],
        borderWidth: 1,
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
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Credit Status</h2>

      <div className="h-48">
        <Doughnut ref={chartRef} data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs">Paid payment</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
          <span className="text-xs">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
          <span className="text-xs">On credit</span>
        </div>
      </div>
    </div>
  )
}

export default CreditStatus
