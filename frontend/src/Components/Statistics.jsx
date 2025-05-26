const StatCard = ({ title, value = 0, change = "0%", suffix = "%" }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        <span className="ml-1 text-xl font-bold">{suffix}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{change}</p>
    </div>
  )
}

const Statistics = ({ data }) => {
  const totalRevenue = data?.totalRevenue || {};
  const grossProfit = data?.grossProfit || {};
  const totalCustomers = data?.totalCustomers || {};
  const newCustomers = data?.newCustomers || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Revenue" value={totalRevenue.value} change={totalRevenue.change} />
      <StatCard title="Gross Profit" value={grossProfit.value} change={grossProfit.change} />
      <StatCard title="Total Customers" value={totalCustomers.value} change={totalCustomers.change} suffix="" />
      <StatCard title="New Customers" value={newCustomers.value} change={newCustomers.change} suffix="" />
    </div>
  )
}

export default Statistics;
