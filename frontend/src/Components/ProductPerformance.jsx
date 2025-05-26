const ProductPerformance = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div>Loading product performance...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Product Performance</h2>
        <span className="text-sm text-gray-500">Most sold</span>
      </div>

      <div className="space-y-4">
        {data.map((product, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.price}</p>
              <p className="text-xs text-gray-400">{product.sold} sold</p>
            </div>
            <span className="text-[#8AAE4A] flex items-center text-sm">
              {product.change} <TrendingUp size={14} className="ml-1" />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPerformance
