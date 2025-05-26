
import { useState, useEffect } from "react"
import SalesOverview from "./SalesOverview"
import Statistics from "../Components/Statistics"
import CustomerRetention from "../Components/CustomerRetention"
import CreditStatus from "../Components/CreditStatus"
import ProductPerformance from "../Components/ProductPerformance"  
import DailyAnalytics from "../Components/DailyAnalytics"
import { fetchSalesData } from "../api/dashboardApi" // Adjust the import path as necessary
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function Salesmanegement() {
  const [salesData, setSalesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeView, setActiveView] = useState("Sales Management")

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        setLoading(true)
        const data = await fetchSalesData()
        setSalesData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.")
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    loadSalesData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Use mock data if API data is not available
  const data = salesData || {
    user: {
      name: "Nagesh Kumar",
      role: "Owner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    salesOverview: {
      monthly: [
        { month: "Jan", salesCount: 2.1, productsSold: 1.2 },
        { month: "Feb", salesCount: 3.5, productsSold: 1.3 },
        { month: "Mar", salesCount: 2.3, productsSold: 1.8 },
        { month: "Apr", salesCount: 3.2, productsSold: 1.5 },
        { month: "May", salesCount: 3.8, productsSold: 1.7 },
        { month: "Jun", salesCount: 4.2, productsSold: 1.9 },
        { month: "Jul", salesCount: 4.5, productsSold: 2.0 },
      ],
    },
    statistics: {
      totalRevenue: { value: 150, change: "+15% from last month" },
      grossProfit: { value: 60, change: "+10% from last month" },
      totalCustomers: { value: 500, change: "+5% from last month" },
      newCustomers: { value: 100, change: "+8% from last month" },
    },
    customerRetention: {
      returning: 60,
      new: 40,
    },
    creditStatus: {
      paid: 20,
      pending: 35,
      credit: 45,
    },
    productPerformance: [
      { name: "Product name", price: "₹498.00", sold: 120, change: "+15%" },
      { name: "Product name", price: "₹498.00", sold: 150, change: "+15%" },
      { name: "Product name", price: "₹498.00", sold: 180, change: "+15%" },
      { name: "Product name", price: "₹498.00", sold: 110, change: "+15%" },
      { name: "Product name", price: "₹498.00", sold: 90, change: "+15%" },
    ],
    dailyAnalytics: {
      salesMade: { value: "₹2489.00", count: "12 orders today" },
      productsSold: { value: 32, count: "12 orders today" },
      customersVisited: { value: 9, count: "3 returning today" },
    },
    date: "12-02-2023",
  }

  return (
    <div className="flex h-screen bg-gray-100">
    

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <SalesOverview data={data.salesOverview} />

              <Statistics data={data.statistics} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CustomerRetention data={data.customerRetention} />
                <CreditStatus data={data.creditStatus} />
                <ProductPerformance data={data.productPerformance} />
              </div>

              <DailyAnalytics data={data.dailyAnalytics} date={data.date} />
            </div>
          </div>
        </main>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Salesmanegement;
