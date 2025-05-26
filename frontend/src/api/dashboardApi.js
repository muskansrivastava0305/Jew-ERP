// This file contains API functions for the dashboard

// Fetch metals data
export const fetchMetals = async () => {
    try {
      const response = await fetch("/api/metals")
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      // Harshit Chauhan qwert
      // return await response.json()
      return [
        {
          id: 1,
          name: "Metal 1",
          price: 45000.05,
          trend: 1.5,
          lastUpdated: new Date().toISOString(),
          icon: null,
        },
        {
          id: 2,
          name: "Metal 2",
          price: 45000.05,
          trend: -0.8,
          lastUpdated: new Date().toISOString(),
          icon: null,
        },
        {
          id: 3,
          name: "Metal 3",
          price: 45000.05,
          trend: 2.3,
          lastUpdated: new Date().toISOString(),
          icon: null,
        },
        {
          id: 4,
          name: "Metal 4",
          price: 45000.05,
          trend: 0.5,
          lastUpdated: new Date().toISOString(),
          icon: null,
        },
      ]
    } catch (error) {
      console.error("Error fetching metals:", error)
      // For demo purposes, return mock data if API fails
       
    }
  }
  
  // Fetch sales data for the graph
  export const fetchSalesData = async (period = "monthly") => {
    try {
      const response = await fetch(`/api/sales/graph?period=${period}`)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching sales data:", error)
      // For demo purposes, return mock data if API fails
  
      // Generate mock data based on period
      const salesMade = []
      const productsSold = []
  
      if (period === "daily") {
        // 24 hours data
        for (let i = 0; i < 24; i++) {
          const hour = i < 10 ? `0${i}:00` : `${i}:00`
          salesMade.push({ hour, value: Math.floor(Math.random() * 50) + 10 })
          productsSold.push({ hour, value: Math.floor(Math.random() * 40) + 5 })
        }
      } else if (period === "weekly") {
        // 7 days data
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        for (let i = 0; i < 7; i++) {
          salesMade.push({ day: days[i], value: Math.floor(Math.random() * 200) + 50 })
          productsSold.push({ day: days[i], value: Math.floor(Math.random() * 150) + 30 })
        }
      } else {
        // Monthly data (12 months)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        for (let i = 0; i < 12; i++) {
          salesMade.push({ month: months[i], value: Math.floor(Math.random() * 500) + 100 })
          productsSold.push({ month: months[i], value: Math.floor(Math.random() * 400) + 80 })
        }
      }
  
      return { salesMade, productsSold }
    }
  }
  
  // Fetch recent customers
  export const fetchCustomers = async (limit = 5) => {
    try {
      const response = await fetch(`/api/customers/recent?limit=${limit}`)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      // return await response.json()
      return [{
        
        id: "id",
        name: "Customer's Name",
        email: "customer@example.com",
        phone: "+91 12345 78908",
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        createdAt: "2023-01-15T00:00:00.000Z",
        totalOrders: 12,
        totalSpent: 145000,
        lastPurchase: "2023-05-20T00:00:00.000Z",
        avatar: null,
        
        recentOrders: [
          {
            id: "ORD001",
            date: "2023-05-20T00:00:00.000Z",
            itemCount: 3,
            total: 45000,
            status: "Completed",
          },
          {
            id: "ORD002",
            date: "2023-04-15T00:00:00.000Z",
            itemCount: 2,
            total: 30000,
            status: "Completed",
          },
          {
            id: "ORD003",
            date: "2023-03-10T00:00:00.000Z",
            itemCount: 5,
            total: 70000,
            status: "Completed",
          },
        ],
      }
    ]

    }
     catch (error) {
      console.error("Error fetching customers:", error)
      // For demo purposes, return mock data if API fails
      return Array(limit)
        .fill()
        .map((_, index) => ({
          id: index + 1,
          name: `Customer's Name`,
          phone: "+91 12345 78908",
          avatar: null,
        }))
    }
  }
  
  // Fetch analytics data
  export const fetchAnalytics = async (date) => {
    try {
      const response = await fetch(`/api/analytics?date=${date}`)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching analytics:", error)
      // For demo purposes, return mock data if API fails
      return {
        salesMade: {
          value: 54280.9,
          change: 12,
        },
        productsSold: {
          value: 33,
          change: -5,
        },
        customersVisited: {
          value: 9,
          change: 0,
        },
      }
    }
  }
  