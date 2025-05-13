"use client"

import { useState } from "react"
import MetalSection from "./MetalSection"
import StoneSection from "./StoneSection"
import AddMetalModal from "./AddMetal"
import AddStoneModal from "./AddStone"

function MetalManagement() {
  const [activeTab, setActiveTab] = useState("metal")
  const [viewMode, setViewMode] = useState("grid")
  const [showAddMetalModal, setShowAddMetalModal] = useState(false)
  const [showAddStoneModal, setShowAddStoneModal] = useState(false)

  const [metals, setMetals] = useState([
    { id: 1, name: "Gold", price: 500.0, image: "/pic.png" },
    { id: 2, name: "Gold", price: 500.0, image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "Gold", price: 500.0, image: "/placeholder.svg?height=150&width=150" },
    { id: 4, name: "Gold", price: 500.0, image: "/placeholder.svg?height=150&width=150" },
    { id: 5, name: "Gold", price: 500.0, image: "/placeholder.svg?height=150&width=150" },
    { id: 6, name: "Gold", price: 500.0, image: "/placeholder.svg?height=150&width=150" },
  ])

  const [stones, setStones] = useState([
    { id: 1, name: "Diamond", price: 5000.0, image: "/placeholder.svg?height=150&width=150" },
    { id: 2, name: "Ruby", price: 3000.0, image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "Emerald", price: 4000.0, image: "/placeholder.svg?height=150&width=150" },
    { id: 4, name: "Sapphire", price: 3500.0, image: "/placeholder.svg?height=150&width=150" },
  ])

  const handleAddMetal = (newMetal) => {
    setMetals([...metals, { ...newMetal, id: metals.length + 1 }])
  }

  const handleAddStone = (newStone) => {
    setStones([...stones, { ...newStone, id: stones.length + 1 }])
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
       
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "metal" ? "bg-[#8BAD3F] text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("metal")}
              >
                Metal
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "stone" ? "bg-[#8BAD3F] text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("stone")}
              >
                Stone
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setViewMode("list")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${viewMode === "list" ? "text-[#8BAD3F]" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setViewMode("grid")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${viewMode === "grid" ? "text-[#8BAD3F]" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {activeTab === "metal" ? (
            <MetalSection metals={metals} viewMode={viewMode} onAddClick={() => setShowAddMetalModal(true)} />
          ) : (
            <StoneSection stones={stones} viewMode={viewMode} onAddClick={() => setShowAddStoneModal(true)} />
          )}
        </main>
      </div>

      {showAddMetalModal && <AddMetalModal onClose={() => setShowAddMetalModal(false)} onAddMetal={handleAddMetal} />}

      {showAddStoneModal && <AddStoneModal onClose={() => setShowAddStoneModal(false)} onAddStone={handleAddStone} />}
    </div>
  )
}

export default MetalManagement
