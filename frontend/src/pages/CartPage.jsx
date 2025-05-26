import { useCart } from "../Components/CartContext"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"


const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const navigate = useNavigate();


  // ✅ Fix: Use unitPrice instead of price
  const subtotal = cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
  const cgst = 250
  const sgst = 250
  const goldDiscount = 1000
  const totalAmount = subtotal + cgst + sgst - goldDiscount

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* Left Side - Cart Items */}
      <div className="w-full md:w-2/3">
        <div className="bg-[#8AAE4A] text-white font-semibold px-4 py-2 rounded-t-md bg-opacity-70">
          Items in cart
        </div>
        <div className="border rounded-b-md">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 border-b last:border-b-0 items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ₹{(item?.unitPrice || 0).toFixed(2)} x {item?.quantity || 1}
                </p>
                {item.size && <p className="text-sm">Size {item.size}</p>}
                <p className="text-green-600 text-sm cursor-pointer">See price breakup</p>
                <p className="mt-2 font-semibold">
                ₹{((item?.unitPrice || 0) * (item?.quantity || 1)).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-[#8AAE4A] text-white w-6 h-6 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  className="bg-[#8AAE4A] text-white w-6 h-6 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>
                <Trash2 className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        <button className="mt-4 bg-[#8AAE4A] text-white px-4 py-2 rounded shadow"
         onClick={() => navigate("/product-management")}>
           
          + Add another product
        </button>
      </div>

      {/* Right Side - Payment Summary */}
      <div className="w-full md:w-1/3 bg-white border rounded-md p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>—</span>
          </div>
          <div className="flex justify-between">
            <span>CGST</span>
            <span>₹{cgst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>SGST</span>
            <span>₹{sgst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Gold discount</span>
            <span>-₹{goldDiscount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex bg-gray-100 p-2 rounded-md justify-between mt-4">
          <input
            type="text"
            placeholder="Enter Promo Code"
            className="rounded-l px-3 py-1 text-sm w-2/3"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button className="bg-[#8AAE4A] text-white px-4 py-1 rounded-md text-sm">Apply</button>
        </div>

        <div className="flex justify-between font-semibold mt-4">
          <span>Total amount</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <button className="mt-4 bg-[#8AAE4A] text-white w-full py-2 rounded">Checkout</button>
      </div>
    </div>
  )
}

export default CartPage