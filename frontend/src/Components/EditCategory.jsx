import { useState } from "react"

const EditCategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: category.name,
    type: category.type,
    active: category.active,
    image: null,
  })

  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload UI */}
          <div className="flex gap-4 mb-4 items-start">
           <div className="flex flex-col items-center relative w-38 h-38 bg-gray-300 rounded-md overflow-hidden">
  {/* Upload button positioned on top */}
  <label className="absolute justify-center text-center top-0 left-0 right-0 bottom-0 flex items-center cursor-pointer">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
    <span className="cursor-pointer bg-green-800 hover:bg-green-900 text-white text-center text-xs py-1 px-2 rounded">
      Upload
    </span>
  </label>

  {/* Image preview or placeholder */}
  {preview ? (
    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
      {/* Removed the "No Image" text as per your request */}
    </div>
  )}
</div>


            <div className="flex-1">
              {/* Category Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="name">
                  Category name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                  required
                />
              </div>

              {/* Category Type */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="type">
                  Jewellery type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                  required
                >
                  <option value="Metal">Metal</option>
                  <option value="Artificial">Artificial</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700 text-sm font-bold" htmlFor="active">
              Active
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            {/* <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCategoryModal






// import { useState } from "react"

// const EditCategoryModal = ({ category, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: category.name,
//     type: category.type,
//     active: category.active,
//   })

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSave(formData)
//   }

//   return (
// <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-gray-100 rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Edit Category</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Category Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
//               Category Type
//             </label>
//             <select
//               id="type"
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             >
//               <option value="Metal">Metal</option>
//               <option value="Artificial">Artificial</option>
//             </select>
//           </div>
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="active"
//               name="active"
//               checked={formData.active}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-gray-700 text-sm font-bold" htmlFor="active">
//               Active
//             </label>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EditCategoryModal
