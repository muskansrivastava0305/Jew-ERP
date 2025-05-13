"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchCustomerDetails } from "../api/customerApi"

const CustomerDetails = () => {
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCustomerDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchCustomerDetails(id);
        setCustomer(data)
      } catch (err) {
        console.error("Error loading customer details:", err)
        setError("Failed to load customer details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
//------------------------------------
  //  if (id) loadCustomerDetails();
  loadCustomerDetails();
  }, [id])

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

  if (!customer) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Customer Not Found</h2>
        <p className="text-gray-600 mb-4">The customer you're looking for doesn't exist or has been removed.</p>
        <Link to="/customer-management" className="text-green-600 hover:text-green-800">
          Back to Customer Management
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/customer-management" className="text-green-600 hover:text-green-800">
          &larr; Back to Customer Management
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Customer Header */}
        <div className="p-6 bg-green-50 border-b">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img
                src={customer.avatar || "/pic.png"}
                alt={customer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "pic.png" // Fallback image if the avatar fails to load
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{customer.name}</h1>
              <p className="text-gray-600">{customer.email}</p>
              <p className="text-gray-600">{customer.phone}</p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Address</span>
                  <p>{customer.address}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">City</span>
                  <p>{customer.city}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">State</span>
                  <p>{customer.state}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Postal Code</span>
                  <p>{customer.postalCode}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Account Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Customer Since</span>
                  <p>{new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Total Orders</span>
                  <p>{customer.totalOrders}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Total Spent</span>
                  <p>₹{customer.totalSpent.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Last Purchase</span>
                  <p>{customer.lastPurchase ? new Date(customer.lastPurchase).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            {customer.recentOrders && customer.recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customer.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">#{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.itemCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{order.total.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "Pending"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No recent orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails
