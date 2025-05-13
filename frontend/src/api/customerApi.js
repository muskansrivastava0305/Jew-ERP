// This file contains API functions for customer management

// Fetch all customers
export const fetchAllCustomers = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/customers?page=${page}&limit=${limit}`)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching all customers:", error)
      throw error
    }
  }
  
  // Fetch a single customer by ID
  export const fetchCustomerDetails = async (id) => {
    try {
      const response = await fetch(`/api/customers/${id}`)
  
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`)
      // }
  
      // return await response.json()
      return {
        id: id,
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
    } catch (error) {
      console.error(`Error fetching customer with ID ${id}:`, error)
      // For demo purposes, return mock data if API fails
      
    }
  }
  
  // Create a new customer
  export const createCustomer = async (customerData) => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error creating customer:", error)
      throw error
    }
  }
  
  // Update customer details
  export const updateCustomer = async (id, customerData) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error(`Error updating customer with ID ${id}:`, error)
      throw error
    }
  }
  
  // Delete a customer
  export const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error(`Error deleting customer with ID ${id}:`, error)
      throw error
    }
  }
  
  // Search customers
  export const searchCustomers = async (query) => {
    try {
      const response = await fetch(`/api/customers/search?q=${encodeURIComponent(query)}`)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error(`Error searching customers with query "${query}":`, error)
      throw error
    }
  }
  