// This file contains API functions for stones management

// Fetch all stones
export const fetchAllStones = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/stones")

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching all stones:", error)
    throw error
  }
}

// Fetch a single stone by ID
export const fetchStoneById = async (id) => {
  try {
    const response = await fetch(`/api/stones/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching stone with ID ${id}:`, error)
    throw error
  }
}

// Update stone price
export const updateStonePrice = async (id, price) => {
  try {
    const response = await fetch(`/api/stones/${id}/price`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error updating price for stone with ID ${id}:`, error)
    throw error
  }
}

// Create a new stone
export const createStone = async (stoneData) => {
  try {
    const response = await fetch("http://localhost:5000/api/stones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stoneData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("Error creating stone:", error)
    throw error
  }
}

// Update stone details
export const updateStone = async (id, stoneData) => {
  try {
    const response = await fetch(`/api/stones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stoneData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error updating stone with ID ${id}:`, error)
    throw error
  }
}

// Delete a stone
export const deleteStone = async (id) => {
  try {
    const response = await fetch(`/api/stones/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error deleting stone with ID ${id}:`, error)
    throw error
  }
}