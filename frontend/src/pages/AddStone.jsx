import { useState } from "react"
import { createStone } from "../api/stoneApi"

const AddStoneModal = ({ onClose, onAddStone }) => {
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    size: "",
    color: "",
    piece: "",
    price: "",
    weight: "",
    image: null,
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
      const newStone = {
        name: formData.name,
        unit: formData.unit,
        size: formData.size,
        color: formData.color,
        piece: formData.piece,
        price: Number.parseFloat(formData.price),
        weight: formData.weight,
        image: previewUrl || "/placeholder.svg?height=150&width=150",
      }
      const res = await createStone(newStone)
      onAddStone(res)
      onClose()
    } catch (error) {
      console.error("Error creating stone:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Stone</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full ">
          <div className=" ">
          <div className=" flex gap-8 ">
          <div className="col-span-1 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-4">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover rounded" />
            ) : (
              <label htmlFor="stone-image-upload" className="cursor-pointer">
                <div className="w-24 h-24 bg-gray-100 flex flex-col items-center justify-center rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3m-3-3V4" />
                  </svg>
                  <span className="text-green-900 text-xs">Upload</span>
                </div>
              </label>
            )}
            <input
              type="file"
              id="stone-image-upload"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
            <div className=" flex flex-col gap-10 items-center justify-center ">
            <div className=" flex gap-5 w-full">
              <p className=" font-semibold w-[100px]">Stone name</p>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Stone’s name" className="input  bg-gray-100 py-2 w-[300px] px-3 rounded-md" required />
            </div>
            <div className=" flex gap-5 ">
              <p className=" font-semibold w-[100px]">Unit</p>
            <select name="unit" value={formData.unit} onChange={handleChange} className="input bg-gray-100 py-2 px-3 w-[300px] rounded-md" required>
              <option value="">Unit</option>
              <option value="carat">Carat</option>
              <option value="gram">Gram</option>
            </select>
            </div>
            </div>
            </div>

          <div className="md:col-span-2 mt-8 gap-4">
          <div className=" flex gap-4">
          <div className=" flex gap-2">
            <p className="font-semibold w-10">Size</p>
            <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Size" className="input w-[120px] bg-gray-100 px-2 py-1 rounded-md" />
            </div>

            <div className=" flex gap-2">
              <p className=" font-semibold w-10">Color</p>
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" className="input w-[120px] bg-gray-100 px-2 py-1 rounded-md" />
            </div>

            <div className=" flex gap-2">
              <p className="font-semibold w-10 ">Piece</p>
            <input type="number" name="piece" value={formData.piece} onChange={handleChange} placeholder="Piece" className="input w-[120px]  bg-gray-100 px-2 py-1 rounded-md" />
            </div>
            </div>

<div className=" flex gap-4 mt-7">
            <div className=" flex gap-2">
              <p className="font-semibold w-10">Price</p>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input w-[120px] bg-gray-100 px-2 py-1 rounded-md" step="0.01" min="0" required />
            </div>

            <div className=" flex gap-2">
              <p className="font-semibold w-10">Weight</p>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" className="input w-[120px] bg-gray-100 px-2 py-1 rounded-md" />
            </div>
            </div>

          </div>

          </div>

          <div className="col-span-3 flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#8BAD3F] text-white rounded-md hover:bg-[#7A9A35] disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add stone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStoneModal
