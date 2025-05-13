import { Link } from "react-router-dom"
import { ChevronRightIcon } from "./Icons"

const CustomerList = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <div className="text-center py-8 text-gray-500">No customers found.</div>
  }

  return (
    <div className="divide-y">
      {customers.map((customer) => (
        <div key={customer.id} className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img
                src={customer.avatar || "/pic.png"}
                alt={customer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/pic.png" // Fallback image if the avatar fails to load
                }}
              />
            </div>
            <div>
              <h4 className="font-medium">{customer.name}</h4>
              <p className="text-sm text-gray-500">{customer.phone}</p>
            </div>
          </div>
          <Link to={`/customer/${customer.id}`} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CustomerList
