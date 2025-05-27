import React, { useState } from "react";
import { useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const MetalEditModal = ({ metal, onClose, onSave }) => {
  useEffect(() => {
    console.log(metal, "data");
  });
  const [formData, setFormData] = useState({
    name: metal.name,

    standardPurityPrice: metal.standardPurityPrice,
    unit: metal.unit,
    standardPurity: metal.standardPurity,
    variants: metal.variants || [],
    image: metal.image || null,
  });

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] =
      field === "price" || field === "purity" ? parseFloat(value) : value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: "", purity: 0, price: 0 }],
    });
  };

  const handleDeleteVariant = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants.splice(index, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    console.log(formData);
    try {
      const res = await fetch(`/api/metals/${metal._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        onSave(result);
        onClose();
      } else {
        alert("Failed to update metal");
      }
    } catch (err) {
      console.error(err);
      alert("Error while saving");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm  flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-5  max-w-2xl relative">
        <button
          className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div className="flex flex-col items-center justify-center rounded-lg relative w-35 h-35 bg-gray-100 overflow-hidden">
              {/* Upload Label Centered */}
              <label
                htmlFor="imageUpload"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               flex items-center gap-1 bg-[#4C5C1A] text-white px-3 py-1 rounded-md cursor-pointer"
              >
                <FiUpload size={18} />
                <span>Upload</span>
              </label>

              {/* Hidden File Input */}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {/* Image Preview */}
              {formData.image && (
                <img
                  src={formData.image}
                  alt="metal"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="md:col-span-2 gap-3">
              <div className="flex flex-col gap-10 ">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium w-40">
                    Metal's name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className=" bg-gray-100 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium w-40">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    className=" bg-gray-100 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row mt-4 gap-3 ">
            <div className=" flex">
              <label className="text-sm flex items-center font-medium w-full ">
                Standard purity %
              </label>
              <input
                type="number"
                value={formData.standardPurity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    standardPurity: parseFloat(e.target.value),
                  })
                }
                className=" bg-gray-100 rounded w-full px-3 py-2"
              />
            </div>
            <div className="flex gap-3">
              <label className="text-sm flex items-center font-medium w-full">
                Standard purity price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className=" bg-gray-100 rounded px-2 py-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Add variants</h3>
            <button
              onClick={handleAddVariant}
              className=" text-black font-extrabold rounded px-1 text-3xl"
            >
              +
            </button>
          </div>
          <table className="w-full text-sm ">
            <thead className="bg-[#8BAD3F] text-white">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Purity</th>
                <th className="p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {formData.variants.map((variant, index) => (
                <tr key={index} className="">
                  <td className=" p-1">
                    <input
                      value={variant.name}
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                      className="w-full bg-gray-100 px-2 py-1 rounded"
                    />
                  </td>
                  <td className="p-1">
                    <input
                      type="number"
                      value={variant.purity}
                      onChange={(e) =>
                        handleVariantChange(index, "purity", e.target.value)
                      }
                      className="w-full bg-gray-100 px-2 py-1 rounded"
                    />
                  </td>
                  <td className="p-1">
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      className="w-full bg-gray-100 px-2 py-1 rounded"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleDeleteVariant(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="bg-[#8BAD3F] text-white px-6 py-2 rounded hover:bg-[#7A9A35]"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetalEditModal;
