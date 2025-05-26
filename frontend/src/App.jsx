import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CustomerDetails from './pages/CustomerDetails'
import DashboardLayout from './pages/DashboardLayout'
import PrivateRoute from './pages/PrivateRoute'
import MetalManagement from './pages/MetalManagement'
import CategoryManagement from './pages/CategoryManagement'
import ProductManagement from './pages/ProductManagement'
import './index.css'
import Salesmanegement from './pages/SalesManagement'
import CartPage from './pages/CartPage'

const App = () => {
  return (
    <Routes>
      {/* Default route goes to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer-management" element={<CustomerDetails />} />
        <Route path="/metal-management" element={<MetalManagement />} /> {/* <-- Fixed */}
        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="/Product-Management" element={<ProductManagement />} />
        <Route path="/sales-management" element={<Salesmanegement />} />
        <Route path= "/cart-page" element={< CartPage /> } />
      </Route>
    </Routes>
  )
}

export default App


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import CustomerDetails from "./pages/CustomerDetails"
// import Profile from "./pages/Profile"
// import Sidebar from "./Components/Sidebar"
// import Header from "./Components/Header"
// import MetalPriceCard from "./Components/MetalPriceCard"
// import "./index.css"
// import { HomeIcon } from "./Components/Icons"
// import Home from "./pages/Home"

// function App() {
//   return (
   
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header />
//           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/metal-management" element={<MetalPriceCard />} />
//               <Route path="/customer-management" element={<CustomerDetails />} />
//               <Route path="/profile" element={<Profile />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
  
//   )
// }

// export default App
