"use client"

const StoneSection = ({ stones, viewMode, onAddClick }) => {
  const handleEditDetails = (id) => {
    // Implement edit functionality
    console.log(`Edit stone with id: ${id}`)
  }

  return (
    <div className="relative">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stones.map((stone) => (
            <div key={stone.id} className="bg-white rounded-md overflow-hidden shadow">
              <div className="h-40 bg-gray-200">
                <img src={stone.image || "/placeholder.svg"} alt={stone.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{stone.name}</h3>
                  <span className="text-sm">₹{stone.price.toFixed(2)}/ct</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 bg-[#8BAD3F] text-white text-sm rounded-md hover:bg-[#7A9A35]"
                    onClick={() => handleEditDetails(stone.id)}
                  >
                    Edit details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stones.map((stone) => (
                <tr key={stone.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={stone.image || "/placeholder.svg"}
                        alt={stone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{stone.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{stone.price.toFixed(2)}/ct</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="px-3 py-1 bg-[#8BAD3F] text-white text-sm rounded-md hover:bg-[#7A9A35]"
                      onClick={() => handleEditDetails(stone.id)}
                    >
                      Edit details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="fixed bottom-6 right-6 flex items-center justify-center px-4 py-2 bg-[#8BAD3F] text-white rounded-md shadow-lg hover:bg-[#7A9A35]"
        onClick={onAddClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add new stone
      </button>
    </div>
  )
}

export default StoneSection
