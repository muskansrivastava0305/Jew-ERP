// This file would contain actual API calls in a real application
// For now, we'll simulate API calls with a delay

export const fetchSalesData = async () => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API data in a real application
      resolve({
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
      })
    }, 1000)
  })
}

// Example of how to implement CRUD operations for products
export const fetchProducts = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Product 1", price: 498, stock: 120 },
        { id: 2, name: "Product 2", price: 498, stock: 85 },
        // More products...
      ])
    }, 800)
  })
}

export const createProduct = async (productData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...productData })
    }, 800)
  })
}

export const updateProduct = async (id, productData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, ...productData })
    }, 800)
  })
}

export const deleteProduct = async (id) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id })
    }, 800)
  })
}
