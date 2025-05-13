// Mock API functions
// In a real application, these would make actual API calls to your backend

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Metal icons paths
const metalIconPaths = [
  "M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z",
  "M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z",
  "M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z",
  "M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
]

// Fetch metal prices
export async function fetchMetalPrices() {
  await delay(1000)

  return [
    {
      id: "metal1",
      name: "Metal 1",
      price: 45000.05,
      change: 2.5,
      lastUpdated: "10-02-2023, 11:30",
      iconPath: metalIconPaths[0],
    },
    {
      id: "metal2",
      name: "Metal 2",
      price: 45000.05,
      change: 3.2,
      lastUpdated: "10-02-2023, 11:29",
      iconPath: metalIconPaths[1],
    },
    {
      id: "metal3",
      name: "Metal 3",
      price: 45000.05,
      change: 1.8,
      lastUpdated: "10-02-2023, 11:29",
      iconPath: metalIconPaths[2],
    },
    {
      id: "metal4",
      name: "Metal 4",
      price: 45000.05,
      change: 2.1,
      lastUpdated: "10-02-2023, 11:28",
      iconPath: metalIconPaths[3],
    },
  ]
}

// Fetch sales data with date filter
export async function fetchSalesData(dateFilter = "all") {
  await delay(800)

  // In a real app, you would use the dateFilter to fetch different data
  return [
    { month: "Jan", salesMade: 2.5, productsSold: 1.2 },
    { month: "Feb", salesMade: 3.8, productsSold: 1.8 },
    { month: "Mar", salesMade: 2.2, productsSold: 2.3 },
    { month: "Apr", salesMade: 3.0, productsSold: 2.0 },
    { month: "May", salesMade: 4.5, productsSold: 2.5 },
    { month: "Jun", salesMade: 3.5, productsSold: 3.2 },
    { month: "Jul", salesMade: 4.0, productsSold: 2.8 },
  ]
}

// Fetch customers
export async function fetchCustomers() {
  await delay(1200)

  return [
    {
      id: "cust1",
      name: "Customer's Name",
      phone: "+91 12345 78906",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: "cust2",
      name: "Customer's Name",
      phone: "+91 12345 78906",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: "cust3",
      name: "Customer's Name",
      phone: "+91 12345 78906",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: "cust4",
      name: "Customer's Name",
      phone: "+91 12345 78906",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: "cust5",
      name: "Customer's Name",
      phone: "+91 12345 78906",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: "cust6",
      name: "Customer's Name",
      phone: "+91 12345 78906",
      avatar: "https://via.placeholder.com/40",
    },
  ]
}

// Fetch analytics
export async function fetchAnalytics() {
  await delay(900)

  return {
    salesMade: 84280.9,
    salesChange: 2.5,
    productsSold: 43,
    productsChange: 3.0,
    customersVisited: 9,
    customersChange: 1.5,
    date: "12-02-2023",
  }
}

// Fetch metal history
export async function fetchMetalHistory(metalId) {
  await delay(1000)

  // Generate some mock history data
  const history = []
  const basePrice = 45000
  const today = new Date()

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const change = (Math.random() * 4 - 2).toFixed(2) // Random change between -2% and 2%
    const price = basePrice + ((basePrice * Number.parseFloat(change)) / 100) * (30 - i)

    history.push({
      date: date.toLocaleDateString(),
      price: price,
      change: Number.parseFloat(change),
    })
  }

  return history
}

// Fetch detailed sales data
export async function fetchDetailedSalesData(dateFilter = "all") {
  await delay(1200)

  // Generate mock sales data
  const sales = []
  const customers = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"]
  const metals = ["Metal 1", "Metal 2", "Metal 3", "Metal 4"]
  const statuses = ["Completed", "Pending", "Cancelled"]

  for (let i = 1; i <= 20; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    sales.push({
      id: `ORD-${1000 + i}`,
      date: date.toLocaleDateString(),
      customer: customers[Math.floor(Math.random() * customers.length)],
      metal: metals[Math.floor(Math.random() * metals.length)],
      amount: Math.floor(Math.random() * 50000) + 10000,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    })
  }

  // Sort by date (newest first)
  sales.sort((a, b) => new Date(b.date) - new Date(a.date))

  return sales
}

// Fetch products data
export async function fetchProductsData() {
  await delay(1000)

  const products = []
  const categories = ["Gold", "Silver", "Platinum", "Diamond"]

  for (let i = 1; i <= 25; i++) {
    products.push({
      id: `PRD-${1000 + i}`,
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 50000) + 5000,
      stock: Math.floor(Math.random() * 30),
      image: `https://via.placeholder.com/40?text=P${i}`,
    })
  }

  return products
}

// Fetch all customers
export async function fetchAllCustomers() {
  await delay(1000)

  const customers = []

  for (let i = 1; i <= 20; i++) {
    const lastPurchaseDate = new Date()
    lastPurchaseDate.setDate(lastPurchaseDate.getDate() - Math.floor(Math.random() * 60))

    customers.push({
      id: `CUST-${1000 + i}`,
      name: `Customer's Name ${i}`,
      phone: `+91 ${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)}`,
      email: `customer${i}@example.com`,
      totalPurchases: Math.floor(Math.random() * 500000) + 50000,
      lastPurchase: lastPurchaseDate.toLocaleDateString(),
      avatar: `https://via.placeholder.com/40?text=C${i}`,
    })
  }

  return customers
}

// Fetch customer details
export async function fetchCustomerDetails(customerId) {
  await delay(800)

  // Generate a mock customer based on the ID
  const id = customerId.split("-")[1] || "1001"
  const joinedDate = new Date()
  joinedDate.setFullYear(joinedDate.getFullYear() - 1)

  return {
    id: customerId,
    name: `Customer's Name`,
    phone: `+91 ${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)}`,
    email: `customer${id}@example.com`,
    address: "123 Main Street, City, Country",
    company: "ABC Corporation",
    joinedDate: joinedDate.toLocaleDateString(),
    totalPurchases: Math.floor(Math.random() * 500000) + 50000,
    lastPurchase: new Date().toLocaleDateString(),
    avatar: `https://via.placeholder.com/100?text=C${id}`,
  }
}

// Fetch customer purchases
export async function fetchCustomerPurchases(customerId) {
  await delay(1000)

  // Generate mock purchase history
  const purchases = []
  const metals = ["Metal 1", "Metal 2", "Metal 3", "Metal 4"]
  const statuses = ["Completed", "Pending", "Cancelled"]

  for (let i = 1; i <= 10; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i * 15)

    purchases.push({
      id: `ORD-${2000 + i}`,
      date: date.toLocaleDateString(),
      metal: metals[Math.floor(Math.random() * metals.length)],
      amount: Math.floor(Math.random() * 50000) + 10000,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    })
  }

  return purchases
}

// Fetch user profile
export async function fetchUserProfile() {
  await delay(700)

  return {
    name: "Nagesh Kumar",
    role: "Owner",
    email: "nagesh.kumar@example.com",
    phone: "+91 98765 43210",
    accountId: "ACC-12345",
    memberSince: "January 15, 2022",
    lastLogin: "Today, 09:45 AM",
    avatar: "https://via.placeholder.com/100?text=NK",
  }
}
