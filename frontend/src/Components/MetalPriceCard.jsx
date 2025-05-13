"use client"

import { useState } from "react"
import EditMetalPriceModal from "./EditMetalPriceModal"

const MetalPriceCard = ({ metal }) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
      .format(price)
      .replace(/^₹/, "₹")
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("en-IN", options)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
          <img
            src={metal.icon || `/metals/${metal.name.toLowerCase()}.png`}
            alt={metal.name}
            className="w-6 h-6"
            onError={(e) => {
              e.target.src = "/pic.png" // Fallback image if the icon fails to load
            }}
          />
        </div>
        <h3 className="font-medium">{metal.name}</h3>
      </div>

      <div className="p-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{formatPrice(metal.price)}</span>
          <span className="text-sm text-gray-500 ml-1">/per gram</span>
        </div>

        <div className="mt-2 text-xs text-green-600">
          {metal.trend > 0 ? "+" : ""}
          {metal.trend.toFixed(2)}% today
        </div>

        <div className="mt-2 text-xs text-gray-500">Last update: {formatDate(metal.lastUpdated)}</div>

        <button
          onClick={() => setShowEditModal(true)}
          className="mt-4 w-full py-2 bg-[#8AAE4A] text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Update Price
        </button>
      </div>

      {showEditModal && <EditMetalPriceModal metal={metal} onClose={() => setShowEditModal(false)} />}
    </div>
  )
}

export default MetalPriceCard
