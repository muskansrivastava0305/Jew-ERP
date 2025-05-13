const User = require("../Models/User")
const bcrypt = require("bcrypt")

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // In a real application, you would get the user ID from the authenticated session
    // For demo purposes, we'll use a fixed ID or the first user
    const userId = req.user?.id || "1"

    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    res.status(500).json({ message: "Failed to fetch user profile", error: error.message })
  }
}

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    // In a real application, you would get the user ID from the authenticated session
    const userId = req.user?.id || "1"

    const { name, email, phone, role, bio } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email })

      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" })
      }
    }

    if (name) user.name = name
    if (email) user.email = email
    if (phone) user.phone = phone
    if (role) user.role = role
    if (bio !== undefined) user.bio = bio

    const updatedUser = await user.save()

    // Don't return the password
    const userResponse = updatedUser.toObject()
    delete userResponse.password

    res.status(200).json(userResponse)
  } catch (error) {
    console.error("Error updating user profile:", error)
    res.status(500).json({ message: "Failed to update user profile", error: error.message })
  }
}

// Change password
exports.changePassword = async (req, res) => {
  try {
    // In a real application, you would get the user ID from the authenticated session
    const userId = req.user?.id || "1"

    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" })
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)

    await user.save()

    res.status(200).json({ message: "Password changed successfully" })
  } catch (error) {
    console.error("Error changing password:", error)
    res.status(500).json({ message: "Failed to change password", error: error.message })
  }
}

// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    // In a real application, you would get the user ID from the authenticated session
    const userId = req.user?.id || "1"

    // In a real application, you would handle file upload here
    // For demo purposes, we'll just update the avatar URL
    const avatarUrl = req.body.avatarUrl

    if (!avatarUrl) {
      return res.status(400).json({ message: "Avatar URL is required" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.avatar = avatarUrl

    const updatedUser = await user.save()

    // Don't return the password
    const userResponse = updatedUser.toObject()
    delete userResponse.password

    res.status(200).json(userResponse)
  } catch (error) {
    console.error("Error uploading profile picture:", error)
    res.status(500).json({ message: "Failed to upload profile picture", error: error.message })
  }
}
