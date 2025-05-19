"use client"

import { useState } from "react"
import EditProductModal from "./EditProduct"

const ProductGrid = ({ products, viewMode, onToggleActive, onEditProduct, onAddToCart }) => {
  const [editingProduct, setEditingProduct] = useState(null)

  const handleEditClick = (product) => {
    setEditingProduct(product)
  }

  const handleEditSave = (updatedProduct) => {
    onEditProduct(editingProduct.id, updatedProduct)
    setEditingProduct(null)
  }

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-200 rounded-md overflow-hidden">
              <div className="h-32 bg-gray-300">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-600 mb-1">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In stock: {product.stock}</span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )}
                </div>
                <div className="font-medium mb-1">{product.name}</div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm">₹{product.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-600">{product.weight}gm</div>
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2 text-xs">
                  <div>{product.materials.metal}</div>
                  <div>{product.materials.bronze} - {product.materials.bronzeCode}</div>
                  <div>{product.materials.stone}</div>
                  <div>{product.materials.pearl}</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id={`toggle-${product.id}`}
                      checked={product.active}
                      onChange={() => onToggleActive(product.id)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`toggle-${product.id}`}
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${product.active ? "bg-green-600" : "bg-gray-300"}`}
                    >
                      <span
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${product.active ? "transform translate-x-4" : ""}`}
                      ></span>
                    </label>
                  </div>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    Edit details
                  </button>
                </div>
                <button
                  onClick={() => onAddToCart(product.id)}
                  disabled={product.stock === 0}
                  className={`w-full py-1 rounded text-sm text-white ${
                    product.stock > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleEditSave}
          />
        )}
      </>
    )
  } else {
    return (
      <>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 bg-gray-300 rounded">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {product.materials.metal}, {product.materials.stone}, {product.materials.bronze}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.weight}gm</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {product.stock > 0 ? (
                        <span className="text-green-600">{product.stock}</span>
                      ) : (
                        <span className="text-red-600">0</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id={`toggle-list-${product.id}`}
                        checked={product.active}
                        onChange={() => onToggleActive(product.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`toggle-list-${product.id}`}
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer ${product.active ? "bg-green-600" : "bg-gray-300"}`}
                      >
                        <span
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${product.active ? "transform translate-x-4" : ""}`}
                        ></span>
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditClick(product)} className="text-gray-600 hover:text-gray-900 mr-3">
                      Edit details
                    </button>
                    <button
                      onClick={() => onAddToCart(product.id)}
                      disabled={product.stock === 0}
                      className={`text-sm ${
                        product.stock > 0 ? "text-green-600 hover:text-green-800" : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Add to cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleEditSave}
          />
        )}
      </>
    )
  }
}

export default ProductGrid
