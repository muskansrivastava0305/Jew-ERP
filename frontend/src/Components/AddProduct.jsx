import { useState } from "react";
import { Plus, Upload } from "lucide-react";

const AddProductModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gender: "",
    price: "",
    stock: "",
    weight: "",
    type: "",
    category: "",
    metals: [{ metal: "", variant: "", weight: "" }],
    stones: [{ stone: "", quantity: "", weight: "", price: "" }],
    huidNumber: "",
    hsnNumber: "",
    makingCharges: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleAddMetal = () => {
    setFormData((prev) => ({
      ...prev,
      metals: [...prev.metals, { metal: "", variant: "", weight: "" }],
    }));
  };

  const handleAddStone = () => {
    setFormData((prev) => ({
      ...prev,
      stones: [
        ...prev.stones,
        { stone: "", quantity: "", weight: "", price: "" },
      ],
    }));
  };

  const handleMetalChange = (index, field, value) => {
    const updated = [...formData.metals];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, metals: updated }));
  };

  const handleStoneChange = (index, field, value) => {
    const updated = [...formData.stones];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, stones: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });
    onAdd(data); // Call backend API handler
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800/30 bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <div className="bg-white rounded-xl p-6 max-w-full overflow-y-auto max-h-[90vh]"> 
        <div className=" flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold flex justify-right cursor-pointer"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" flex gap-8">
            <div className=" ">
              <label className=" bg-gray-200 border w-30 h-30 rounded-lg flex items-center justify-center cursor-pointer">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="preview"
                    className=" object-contain w-30 h-30"
                  />
                ) : (
                  <span className="flex items-center gap-2 text-green-700">
                    <Upload size={16} /> Upload
                  </span>
                )}
                <input type="file" onChange={handleImageUpload} hidden />
              </label>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full">
              <div className=" flex w-full">
                <h1 className=" flex justify-start items-center w-30">Name</h1>
                <input
                  name="name"
                  // placeholder="Name"
                  onChange={handleChange}
                  className="input bg-gray-100 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className=" flex w-full">
                <h3 className=" flex justify-start items-center w-30">
                  Description
                </h3>
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  className="input col-span-2 bg-gray-100  px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
          </div>

          <div className=" mt-3">
            <div className=" flex gap-5">
              <div className=" flex ">
                <h3 className=" flex justify-start items-center  w-20">
                  Gender
                </h3>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="input w-30 bg-gray-100 px-2 py-2 rounded-md"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className=" flex">
                <h1 className=" flex justify-start items-center  w-20">
                  Price
                </h1>
                <input
                  name="price"
                  placeholder="Price"
                  onChange={handleChange}
                  className="input  w-30 bg-gray-100 px-2 py-2 rounded-md"
                />
              </div>

              <div className="flex ">
                <h1 className=" w-20 flex justify-start items-center">Stock</h1>
                <input
                  name="stock"
                  placeholder="In stock"
                  onChange={handleChange}
                  className="input  w-30 bg-gray-100 px-2 py-2 rounded-md"
                />
              </div>
            </div>

            <div className=" flex gap-5 mt-3">
              <div className=" flex">
                <h1 className=" w-20 flex justify-start items-center">
                  Weight
                </h1>
                <input
                  name="weight"
                  placeholder="Weight"
                  onChange={handleChange}
                  className="input w-30 bg-gray-100 px-2 py-2 rounded-md"
                />
              </div>
              <div className=" flex ">
                <h1 className=" w-20 flex justify-start items-center">Type</h1>
                <select
                  name="type"
                  onChange={handleChange}
                  className="input w-30 bg-gray-100 px-2 py-2 rounded-md"
                >
                  <option value="">Type</option>
                  <option value="Ring">Ring</option>
                  <option value="Chain">Chain</option>
                </select>
              </div>
              <div className=" flex ">
                <h1 className=" w-20 flex justify-start items-center">
                  Category
                </h1>
                <input
                  name="category"
                  placeholder="Category"
                  onChange={handleChange}
                  className="input w-30 bg-gray-100 px-2 py-2 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className=" flex justify-between">
              <label className="font-semibold">Select metal</label>
              <button
                type="button"
                onClick={handleAddMetal}
                className="btn-icon mt-1"
              >
                <Plus size={20} />
              </button>
            </div>
            {formData.metals.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-2 mt-2 bg-gray-100 p-3 rounded-md"
              >
                <div className=" flex gap-3 justify-start items-center">
                  <h1 className="text-sm font-semibold">Metal</h1>
                <input
                  placeholder="Metal"
                  value={item.metal}
                  onChange={(e) =>
                    handleMetalChange(i, "metal", e.target.value)
                  }
                  className="input bg-white rounded-md px-3 py-2 w-30"
                />
                </div>
                <div className=" flex gap-3 justify-start items-center">
                  <h1 className="text-sm font-semibold">Variant</h1>
                <input
                  placeholder="Variant"
                  value={item.variant}
                  onChange={(e) =>
                    handleMetalChange(i, "variant", e.target.value)
                  }
                  className="input bg-white rounded-md px-3 py-2 w-30"
                />
                </div>
                <div className=" flex gap-3 justify-start items-center">
                  <h1 className="text-sm font-semibold">Weight</h1>
                <input
                  placeholder="Weight"
                  value={item.weight}
                  onChange={(e) =>
                    handleMetalChange(i, "weight", e.target.value)
                  }
                  className="input bg-white rounded-md px-3 py-2 w-30"
                />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
    
            <div className=" flex justify-between">
            <label className="font-semibold">Select stone</label>
             <button
              type="button"
              onClick={handleAddStone}
              className="btn-icon mt-1"
            >
              <Plus size={20} />
            </button>
            </div>
            {formData.stones.map((item, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 mt-2 bg-gray-100 p-2 rounded-md">
               <div className=" flex  justify-start items-center">
                <h1 className="text-sm font-semibold w-16">Stone</h1>
                <input
                  placeholder="Stone"
                  value={item.stone}
                  onChange={(e) =>
                    handleStoneChange(i, "stone", e.target.value)
                  }
                  className="input bg-white rounded-md px-3 py-2 w-30"
                />
                </div>
                <div className=" flex gap-3 justify-start items-center">
                <h1 className="text-sm font-semibold w-16">Quantity</h1>
                <input
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleStoneChange(i, "quantity", e.target.value)
                  }
                  className="input bg-white rounded-md px-3 py-2 w-30"
                />
                </div>
                <div className=" flex gap-3 justify-start items-center">
                <h1 className="text-sm font-semibold w-16">Weight</h1>
                <input
                  placeholder="Weight"
                  value={item.weight}
                  onChange={(e) =>
                    handleStoneChange(i, "weight", e.target.value)
                  }
                  className="input bg-white rounded-md px-3 py-2 w-30"
                />
                </div>
                <div className=" flex gap-3 justify-start items-center">
                <h1 className="text-sm font-semibold w-16">Price</h1>
                <input
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleStoneChange(i, "price", e.target.value)
                  }
                  className="input bg-white rounded-md px-3 py-2 w-30"
                />
                </div>
          
              </div>
            ))}
           
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
          <div className=" flex gap-3 justify-start items-center">
            <h1 className="text-sm font-semibold w-30">HUID number</h1>
            <input
              name="huidNumber"
              placeholder="HUID number"
              onChange={handleChange}
              className="input bg-gray-100 rounded-md px-3 py-2 "
            />
            </div>
            <div className=" flex gap-3 justify-start items-center">
            <h1 className="text-sm font-semibold w-30">HSN number</h1>
            <input
              name="hsnNumber"
              placeholder="HSN number"
              onChange={handleChange}
              className="input  bg-gray-100 rounded-md px-3 py-2 "
            />
            </div>
            <div className=" flex gap-3 justify-start items-center">
            <h1 className="text-sm font-semibold w-30">Making charges</h1>
            <input
              name="makingCharges"
              placeholder="Making charges"
              onChange={handleChange}
              className="input  bg-gray-100 rounded-md px-3 py-2 "
            />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
          >
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
