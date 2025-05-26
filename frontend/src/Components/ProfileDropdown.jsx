
import { useRef, useEffect } from "react"
import { UserIcon, CogIcon, LogoutIcon } from "./Icons"

const ProfileDropdown = ({ onProfileClick, onClose }) => {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...")
    onClose()
  }

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
      <button
        onClick={onProfileClick}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <UserIcon className="w-4 h-4 mr-2" />
        My Profile
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <CogIcon className="w-4 h-4 mr-2" />
        Settings
      </button>
      <div className="border-t border-gray-100 my-1"></div>
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogoutIcon className="w-4 h-4 mr-2" />
        Logout
      </button>
    </div>
  )
}

export default ProfileDropdown
