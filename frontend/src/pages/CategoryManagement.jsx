
import { useEffect, useState } from "react"

import CategoryGrid from "../Components/CategoryGrid"
import AddCategoryModal from "../Components/AddCategory"
import { ToastContainer, toast } from "react-toastify"

function CategoryManagement() {
  const [activeTab, setActiveTab] = useState("All")
  const [viewMode, setViewMode] = useState("grid")
  const [showAddModal, setShowAddModal] = useState(false)
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: "/ankl.webp",
    },
    {
      id: 2,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 3,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 4,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 5,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 6,
      name: "Ankleta",
      type: "Artificial",
      active: false,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 7,
      name: "Ankleta",
      type: "Artificial",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
  ])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  const handleToggleActive = (id) => {
    setCategories(
      categories.map((category) => (category.id === id ? { ...category, active: !category.active } : category)),
    )
  }

  const handleEditCategory = (id, updatedCategory) => {
    setCategories(categories.map((category) => (category.id === id ? { ...category, ...updatedCategory } : category)))
    toast.success("Category updated successfully!")
  }

  const handleAddCategory = (newCategory) => {
    const id = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1
    setCategories([...categories, { id, ...newCategory, image: `/placeholder.svg?height=150&width=200` }])
    setShowAddModal(false)
    toast.success("New category added successfully!")
  }

  const filteredCategories =
    activeTab === "All" ? categories : categories.filter((category) => category.type === activeTab)

    useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories")
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error("Error fetching categories", err)
    }
  }

  fetchCategories()
}, [])


  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
       
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => handleTabChange("All")}
                className={`px-4 py-2 rounded-md ${activeTab === "All" ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                All
              </button>
              <button
                onClick={() => handleTabChange("Metal")}
                className={`px-4 py-2 rounded-md ${activeTab === "Metal" ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                Metal
              </button>
              <button
                onClick={() => handleTabChange("Artificial")}
                className={`px-4 py-2 rounded-md ${activeTab === "Artificial" ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                Artificial
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewModeChange("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-gray-200" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleViewModeChange("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-200" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <CategoryGrid
            categories={filteredCategories}
            viewMode={viewMode}
            onToggleActive={handleToggleActive}
            onEditCategory={handleEditCategory}
          />

          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md"
            >
              <span className="mr-2">+</span>
              Add new category
            </button>
          </div>
        </main>
      </div>

      {showAddModal && <AddCategoryModal onClose={() => setShowAddModal(false)} onAdd={handleAddCategory} />}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default CategoryManagement
