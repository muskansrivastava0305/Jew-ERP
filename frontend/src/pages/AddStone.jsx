"use client"

import { useState } from "react"
import { createStone } from "../api/stoneApi"

const AddStoneModal = ({ onClose, onAddStone }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        image: file,
      })

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would make an API call here
     

      // Create a new stone object
      const newStone = {
        name: formData.name,
        price: Number.parseFloat(formData.price),
        image: previewUrl || "/placeholder.svg?height=150&width=150",
        description: formData.description,
      }
      createStone(newStone).then((res)=>{
        console.log(res,"Final data")
        onAddStone(res)
      }).catch((a)=>{
        console.log(a)
      })
      // Add the new stone
     

      // Close the modal
      onClose()
    } catch (error) {
      console.error("Error creating stone:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Add New Stone</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stone Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8BAD3F]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per carat (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8BAD3F]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stone Image</label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm text-center">No image selected</span>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="stone-image-upload"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="stone-image-upload"
                    className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md cursor-pointer hover:bg-gray-300"
                  >
                    Choose Image
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8BAD3F]"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8BAD3F] text-white rounded-md hover:bg-[#7A9A35] disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Stone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStoneModal
