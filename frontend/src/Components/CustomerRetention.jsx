import { useRef } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const CustomerRetention = ({ data }) => {
  const chartRef = useRef(null)

  // Return early if data is not available
  if (!data || data.returning == null || data.new == null) {
    return <div>Loading customer retention data...</div>
  }

  const chartData = {
    labels: ["Returning Customers", "New Customers"],
    datasets: [
      {
        data: [data.returning, data.new],
        backgroundColor: ["rgba(74, 222, 128, 0.8)", "rgba(240, 240, 240, 1)"],
        borderColor: ["rgba(74, 222, 128, 1)", "rgba(240, 240, 240, 1)"],
        borderWidth: 1,
        cutout: "75%",
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
      <h2 className="text-lg font-semibold mb-4">Customer Retention</h2>

      <div className="relative h-48">
        <Doughnut ref={chartRef} data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{data.returning}%</span>
          <span className="text-xs text-gray-500">returning customers</span>
        </div>
      </div>
    </div>
  )
}

export default CustomerRetention
