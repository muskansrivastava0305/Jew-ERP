

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BellIcon } from "./Icons"
import ProfileDropdown from "./ProfileDropdown"
import { useCart } from "./CartContext"
import { ShoppingCartIcon } from "lucide-react"


const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const navigate = useNavigate()
   const { cartItems } = useCart();

  // This would come from your auth context or API
  const user = {
    name: "Nagesh Kumar",
    role: "Owner",
    avatar: "/pic.png", // Using the avatar from the mockup
  }

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  const handleProfileClick = () => {
    navigate("/profile")
    setShowProfileDropdown(false)
  }

  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
      <h1 className="text-xl font-bold">Hello Admin</h1>

      <div className="flex items-center space-x-4">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate("/cart-page")}
        >
          <ShoppingCartIcon className="w-6 h-6 text-gray-600" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="w-6 h-6 text-gray-600" />
        </button>

        <div className="relative">
          <button className="flex items-center space-x-2" onClick={toggleProfileDropdown}>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/40"
                }}
              />
            </div>
            <div className="text-sm text-left">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </button>

          {showProfileDropdown && (
            <ProfileDropdown onProfileClick={handleProfileClick} onClose={() => setShowProfileDropdown(false)} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
