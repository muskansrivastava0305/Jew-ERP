const AnalyticsCard = ({ title, value, change, color }) => {
    const getColorClasses = () => {
      switch (color) {
        case "green":
          return "bg-green-500 text-white"
        case "red":
          return "bg-red-500 text-white"
        case "blue":
          return "bg-blue-500 text-white"
        default:
          return "bg-gray-500 text-white"
      }
    }
  
    const formatValue = (val) => {
      return new Intl.NumberFormat("en-IN").format(val)
    }
  
    return (
      <div className={`${getColorClasses()} rounded-lg p-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
            {change > 0 ? "+" : ""}
            {change}% today
          </div>
        </div>
        <div className="mt-2 text-2xl font-bold">{formatValue(value)}</div>
      </div>
    )
  }
  
  export default AnalyticsCard
  