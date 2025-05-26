const DailyAnalytics = ({ data, date }) => {
  if (!data || !data.salesMade || !data.productsSold || !data.customersVisited) {
    return <div>Loading analytics...</div>; // or some fallback UI
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* ... your existing JSX ... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Sales made"
          value={data.salesMade.value}
          count={data.salesMade.count}
          color="bg-green-600"
        />
        <AnalyticsCard
          title="Products sold"
          value={data.productsSold.value}
          count={data.productsSold.count}
          color="bg-red-500"
        />
        <AnalyticsCard
          title="Customers visited"
          value={data.customersVisited.value}
          count={data.customersVisited.count}
          color="bg-green-700"
        />
      </div>
    </div>
  );
};

export default DailyAnalytics;