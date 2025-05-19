import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { CalendarIcon } from "../Components/Icons"
import MetalPriceCard from '../Components/MetalPriceCard';
import SalesGraph from "../Components/SalesGraph"
import CustomerList from "../Components/CustomerList"
import AnalyticsCard from "../Components/AnalyticsCard"
import { fetchMetals, fetchSalesData, fetchCustomers, fetchAnalytics } from "../api/dashboardApi"
function Home() {
  const[loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  const [metals, setMetals] = useState([])
  const [salesData, setSalesData] = useState({ salesMade: [], productsSold: [] })
  const [customers, setCustomers] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [graphPeriod, setGraphPeriod] = useState("monthly")
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch all data in parallel
        const [metalsData, salesData, customersData, analyticsData] = await Promise.all([
          fetchMetals(),
          fetchSalesData(graphPeriod),
          fetchCustomers(),
          fetchAnalytics(currentDate),
        ])

        setMetals(metalsData)
        setSalesData(salesData)
        setCustomers(customersData)
        setAnalytics(analyticsData)
      } catch (err) {
        console.error("Error loading dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [graphPeriod, currentDate])
//--------------------------------
  useEffect(() => {
    console.log('Metals data:', metals);
  }, [metals]);
//-----------------------------------
  const handleGraphPeriodChange = (period) => {
    setGraphPeriod(period)
  }

  const handleDateChange = (date) => {
    setCurrentDate(date)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }
    
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('loggedInUser');
  //   handleSuccess('Logout successful');
  //   setTimeout(() => {
  //     navigate('/login')
  //   }, 1000);
  // }
  return (
    <div className='space-y-6'>

        {/* Metal Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metals.map((metal) => (
          <MetalPriceCard key={metal.id} metal={metal} />
        ))}
      </div>

{/* Sales Graph */}
<div className=" flex flex-row w-full gap-6">
  <div className="flex flex-col w-[1020px] gap-6">
<div className="bg-white p-4 rounded-lg shadow ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sales Graph</h2>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-md ${graphPeriod === "daily" ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
              onClick={() => handleGraphPeriodChange("daily")}
            >
              Daily
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${graphPeriod === "weekly" ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
              onClick={() => handleGraphPeriodChange("weekly")}
            >
              Weekly
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${graphPeriod === "monthly" ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
              onClick={() => handleGraphPeriodChange("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>
        <SalesGraph data={salesData} period={graphPeriod} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Analytics</h2>
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
              <CalendarIcon className="w-4 h-4" />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <AnalyticsCard
              title="Sales made"
              value={analytics.salesMade?.value || 0}
              change={analytics.salesMade?.change || 0}
              color="green"
            />
            <AnalyticsCard
              title="Products sold"
              value={analytics.productsSold?.value || 0}
              change={analytics.productsSold?.change || 0}
              color="red"
            />
            <AnalyticsCard
              title="Customers visited"
              value={analytics.customersVisited?.value || 0}
              change={analytics.customersVisited?.change || 0}
              color="green"
            />
          </div>
        </div>
      </div>

<div className="">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Customers */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow w-[375px] ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Customers</h2>
            <Link to="/customer-management" className="text-green-600 hover:text-green-800 text-sm">
              View All
            </Link>
          </div>
          <CustomerList customers={customers} />
           <CustomerList customers={customers} />
            <CustomerList customers={customers} />
             <CustomerList customers={customers} />
              <CustomerList customers={customers} />
               <CustomerList customers={customers} />
                <CustomerList customers={customers} />
        </div>

      {/* <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button> */}

      <ToastContainer />
    </div>
    </div>
      </div>

{/* Analytics */}


 {/* Recent Customers and Analytics */}

    </div>
  )
}

export default Home