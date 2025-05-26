

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const SalesGraph = ({ data, period }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!data || !data.salesMade || !data.productsSold) return

    // Destroy previous chart if it exists
    // if (chartInstance.current) {
    //   chartInstance.current.destroy()
    // }

    const ctx = chartRef.current.getContext("2d")

    // Determine labels based on period
    let labels
    switch (period) {
      case "daily":
        labels = data.salesMade.map((item) => item.hour)
        break
      case "weekly":
        labels = data.salesMade.map((item) => item.day)
        break
      case "monthly":
      default:
        labels = data.salesMade.map((item) => item.month)
        break
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Sales made",
            data: data.salesMade.map((item) => item.value),
            borderColor: "#10B981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Products sold",
            data: data.productsSold.map((item) => item.value),
            borderColor: "#4B5563",
            backgroundColor: "rgba(75, 85, 99, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
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
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, period])

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default SalesGraph
