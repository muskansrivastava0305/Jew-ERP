import React from "react";

const MetalDetailsPage = ({ metal, onClose, onEditClick }) => {
  if (!metal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex items-center mb-5 gap-5">
          <div className="w-40 h-40 bg-gray-200 rounded mr-4 overflow-hidden">
            <img
              src={metal.image || "/placeholder.svg"}
              alt="metal"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">Metal name</p>
            <h2 className="text-lg font-semibold capitalize">{metal.name}</h2>
            <p className="text-sm text-gray-500">Standard purity price</p>
            <p className="font-semibold">₹{metal.price}</p>
            <p className="text-sm text-gray-500">Unit</p>
            <p className="font-semibold uppercase">{metal.unit}</p>
          </div>
        </div>

        <div className="text-sm mb-2 flex justify-between">
          <p className="text-gray-500">Standard purity</p>
          <p className="font-semibold">{metal.standardPurity}%</p>
        </div>
        <div className="text-sm mb-4 flex justify-between">
          <p className="text-gray-500">Last updated on</p>
          <p className="font-semibold">
            {new Date(metal.updatedAt).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-700 font-semibold mb-2">Variants</p>
          {metal.variants && metal.variants.length > 0 ? (
            <table className="w-full text-sm ">
              <thead className="bg-[#8BAD3F] text-white">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Purity</th>
                  <th className="p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {metal.variants.map((v, idx) => (
                  <tr key={idx} className=" bg-gray-100">
                    <td className="p-2 capitalize">{v.name}</td>
                    <td className="p-2">{v.purity}%</td>
                    <td className="p-2">₹{v.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500">No variants available.</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onEditClick}
            className="bg-[#8BAD3F] text-white px-4 py-2 rounded hover:bg-[#7A9A35]"
          >
            Edit details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetalDetailsPage;
