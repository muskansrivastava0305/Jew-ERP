// This file contains API functions for user profile management

// Fetch user profile
export const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching user profile:", error)
      // For demo purposes, return mock data if API fails
      return {
        id: 1,
        name: "Nagesh Kumar",
        email: "nagesh@example.com",
        phone: "+91 98765 43210",
        role: "Owner",
        bio: "Experienced business owner with over 10 years in the metal industry.",
        avatar: null,
        createdAt: "2022-01-01T00:00:00.000Z",
        lastLogin: new Date().toISOString(),
      }
    }
  }
  
  // Update user profile
  export const updateUserProfile = async (profileData) => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error updating user profile:", error)
      // For demo purposes, simulate a successful update
      return { ...profileData, updatedAt: new Date().toISOString() }
    }
  }
  
  // Change password
  export const changePassword = async (passwordData) => {
    try {
      const response = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error changing password:", error)
      throw error
    }
  }
  
  // Upload profile picture
  export const uploadProfilePicture = async (formData) => {
    try {
      const response = await fetch("/api/user/profile-picture", {
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error uploading profile picture:", error)
      throw error
    }
  }
  