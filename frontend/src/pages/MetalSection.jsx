import React, { useState, useEffect } from "react"
import MetalDetailsPage from "../Components/MetailDetails"
import MetalEditModal from "./EditMetals"

const MetalSection = ({ metals = [], viewMode, onAddClick }) => {
  const [metalList, setMetalList] = useState([])
  const [confirmToggle, setConfirmToggle] = useState({ show: false, metalId: null })
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const dummyMetals = [
  {
    id: "1",
    name: "Gold",
    price: 5600,
    unit: "gram",
    standardPurity: 99.9,
    updatedAt: new Date().toISOString(),
    image: "", // or "/placeholder.svg"
    isActive: true,
    variants: [
      { name: "22k", purity: 91.6, price: 5200 },
      { name: "18k", purity: 75, price: 4500 },
    ],
  },
  {
    id: "2",
    name: "Silver",
    price: 75,
    unit: "gram",
    standardPurity: 99.5,
    updatedAt: new Date().toISOString(),
    image: "", // or "/placeholder.svg"
    isActive: true,
    variants: [
      { name: "Sterling", purity: 92.5, price: 65 },
    ],
  },
];

useEffect(() => {
  if (metals.length === 0) {
    setMetalList(dummyMetals.map(m => ({ ...m, isActive: m.isActive ?? true })));
  } else {
    setMetalList(metals.map(m => ({ ...m, isActive: m.isActive ?? true })));
  }
}, [metals]);

  // useEffect(() => {
  //   setMetalList(metals.map(m => ({ ...m, isActive: m.isActive ?? true })))
  // }, [metals])

  const handleRequestToggle = (id) => {
    setConfirmToggle({ show: true, metalId: id })
  }

  const handleConfirmToggle = () => {
    const { metalId } = confirmToggle
    setMetalList(prev =>
      prev.map(metal =>
        metal.id === metalId
          ? { ...metal, isActive: !metal.isActive }
          : metal
      )
    )
    setConfirmToggle({ show: false, metalId: null })
  }


  const handleUpdateMetal = (updatedMetal) => {
  setMetalList(prev =>
    prev.map(m => (m.id === updatedMetal.id || m._id === updatedMetal._id) ? updatedMetal : m)
  );
  setShowEditModal(false);
  setSelectedMetal(null);
};

  const handleCancelToggle = () => {
    setConfirmToggle({ show: false, metalId: null })
  }

  const handleCloseAllModals = () => {
  setSelectedMetal(null);
  setShowEditModal(false);
};



  const handleEditDetails = (id) => {
    console.log(`Edit metal with id: ${id}`)
    const metal = metalList.find(m => m._id === id || m.id === id);
    setSelectedMetal(metal);
    setShowEditModal(false)
  }

  const handleSaveUpdatedMetal = (updatedMetal) => {
  setMetalList(prev =>
    prev.map(m => (m.id === updatedMetal.id || m._id === updatedMetal._id) ? updatedMetal : m)
  );
  handleCloseAllModals();
};

  return (
    <div className="relative">
      {/* METAL GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {metalList.map((metal) => (
          <div key={metal._id || metal.id} className="bg-white rounded-md overflow-hidden shadow">
            <div className="h-40 bg-gray-200">
              <img
                src={metal.image || "/placeholder.svg"}
                alt={metal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{metal.name}</h3>
                {/* <span className="text-sm">₹{metal.price.toFixed(2)}/gm</span> */}
                <span className="text-sm">
  ₹{(metal.price ?? 0).toFixed(2)}/gm
</span>

              </div>
              <div className="flex items-center justify-between">
                {/* Toggle Button */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={metal.isActive}
                   onChange={() => handleRequestToggle(metal._id || metal.id)}

                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8BAD3F] transition-colors duration-300">
                    <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300" />
                  </div>
                </label>

                <button
                  className="px-3 py-1 bg-[#8BAD3F] text-white text-sm rounded-md hover:bg-[#7A9A35]"
                  onClick={() => handleEditDetails(metal._id || metal.id)}
                >
                  Edit details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Metal Button */}
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
        Add new metal
      </button>

      {/* CONFIRMATION MODAL */}
      {confirmToggle.show && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-md shadow-md z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
            <p className="mb-4">Are you sure you want to change the status of this metal?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelToggle}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmToggle}
                className="px-4 py-2 bg-[#8BAD3F] text-white rounded hover:bg-[#7A9A35]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT METAL MODAL */}
      {selectedMetal && !showEditModal && (
  <MetalDetailsPage
    metal={selectedMetal}
    onClose={handleCloseAllModals}
    onEditClick={() => setShowEditModal(true)} // 👈 Triggers the modal!
  />
)}

{selectedMetal && showEditModal && (
  <MetalEditModal
    metal={selectedMetal}
    onClose={handleCloseAllModals}
    onSave={handleSaveUpdatedMetal}
  />
)}
      {/* {selectedMetal && (
  <MetalDetailsPage
    metal={selectedMetal}
    onClose={handleCloseEditModal}
    onEdit={() => setShowEditModal(true)}
  />
)}
{showEditModal && (
  <MetalDetailsPage
    metal={selectedMetal}
    onClose={() => setShowEditModal(false)}
    onSave={handleUpdateMetal}
  />
)} */}

       {/* {selectedMetal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Metal: {selectedMetal.name}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Name:</label>
                <input
                  type="text"
                  value={selectedMetal.name}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Unit:</label>
                <input
                  type="text"
                  value={selectedMetal.unit || ""}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Standard Purity:</label>
                <input
                  type="text"
                  value={selectedMetal.standardPurity || ""}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price:</label>
                <input
                  type="text"
                  value={`₹${selectedMetal.price}`}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default MetalSection
