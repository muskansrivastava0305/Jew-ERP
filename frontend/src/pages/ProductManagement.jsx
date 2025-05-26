
import { useState } from "react"
import CategoryGrid from "../Components/CategoryGrid"
import AddCategoryModal from "../Components/AddCategory"
import { ToastContainer, toast } from "react-toastify"
import ProductGrid from "../Components/ProductGrid"
import AddProductModal from "../Components/AddProduct"
// import "react-toastify/dist/ReactToastify.css"

function ProductManagement() {
  const [activeTab, setActiveTab] = useState("All")
  const [viewMode, setViewMode] = useState("grid")
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [activeSection, setActiveSection] = useState("products") // 'categories' or 'products'
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState([])
  const [showAddModal, setShowAddModal] = useState(false);

  
  // Category data 
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: "/ankl.webp",
    },
    {
      id: 2,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 3,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 4,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 5,
      name: "Ankleta",
      type: "Metal",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 6,
      name: "Ankleta",
      type: "Artificial",
      active: false,
      image: `/placeholder.svg?height=150&width=200`,
    },
    {
      id: 7,
      name: "Ankleta",
      type: "Artificial",
      active: true,
      image: `/placeholder.svg?height=150&width=200`,
    },
  ])

  // Product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pearl Studded Gold Earrings",
      price: 500.00,
      weight: 400,
      stock: 10,
      active: true,
      type: "Metal",
      materials: {
        metal: "Metal",
        stone: "Stone",
        bronze: "Bronze 1",
        pearl: "Pearl",
        bronzeCode: "BR95"
      },
      image: "/ankl.webp",
    },
    {
      id: 2,
      name: "Pearl Studded Gold Earrings",
      price: 500.00,
      weight: 400,
      stock: 10,
      active: true,
      type: "Metal",
      materials: {
        metal: "Metal",
        stone: "Stone",
        bronze: "Bronze 1",
        pearl: "Pearl",
        bronzeCode: "BR95"
      },
      image:  "/ankl.webp",
    },
    {
      id: 3,
      name: "Pearl Studded Gold Earrings",
      price: 500.00,
      weight: 400,
      stock: 10,
      active: true,
      type: "Metal",
      materials: {
        metal: "Metal",
        stone: "Stone",
        bronze: "Bronze 1",
        pearl: "Pearl",
        bronzeCode: "BR95"
      },
      image: "/ankl.webp",
    },
    {
      id: 4,
      name: "Pearl Studded Gold Earrings",
      price: 500.00,
      weight: 400,
      stock: 10,
      active: true,
      type: "Metal",
      materials: {
        metal: "Metal",
        stone: "Stone",
        bronze: "Bronze 1",
        pearl: "Pearl",
        bronzeCode: "BR95"
      },
      image:  "/ankl.webp",
    },
    {
      id: 5,
      name: "Pearl Studded Gold Earrings",
      price: 500.00,
      weight: 400,
      stock: 10,
      active: true,
      type: "Metal",
      materials: {
        metal: "Metal",
        stone: "Stone",
        bronze: "Bronze 1",
        pearl: "Pearl",
        bronzeCode: "BR95"
      },
      image:  "/ankl.webp",
    },
    {
      id: 6,
      name: "Pearl Studded Gold Earrings",
      price: 500.00,
      weight: 400,
      stock: 0,
      active: false,
      type: "Artificial",
      materials: {
        metal: "Metal",
        stone: "Stone",
        bronze: "Bronze 1",
        pearl: "Pearl",
        bronzeCode: "BR95"
      },
      image:  "/ankl.webp",
    },
  ])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const handleToggleActiveCategory = (id) => {
    setCategories(
      categories.map((category) => (category.id === id ? { ...category, active: !category.active } : category)),
    )
  }

  const handleToggleActiveProduct = (id) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, active: !product.active } : product)),
    )
  }

  const handleEditCategory = (id, updatedCategory) => {
    setCategories(categories.map((category) => (category.id === id ? { ...category, ...updatedCategory } : category)))
    toast.success("Category updated successfully!")
  }

  const handleEditProduct = (id, updatedProduct) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product)))
    toast.success("Product updated successfully!")
  }

  const handleAddCategory = (newCategory) => {
    const id = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1
    setCategories([...categories, { id, ...newCategory, image: `/placeholder.svg?height=150&width=200` }])
    setShowAddCategoryModal(false)
    toast.success("New category added successfully!")
  }

  // const handleAddProduct = (newProduct) => {
  //   const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
  //   setProducts([...products, { 
  //     id, 
  //     ...newProduct, 
  //     image: `/placeholder.svg?height=150&width=200`,
  //     active: true
  //   }])
  //   setShowAddProductModal(false)
  //   toast.success("New product added successfully!")
  // }

  const handleAddProduct = async (productData) => {
  try {
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const newProduct = await response.json();
    console.log('Product added:', newProduct);

    // Optionally, refresh product list
    fetchAllProducts();
    setShowAddModal(false); // close modal
  } catch (error) {
    console.error(error);
    alert('Something went wrong while adding product');
  }
};


  const handleAddToCart = (productId) => {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      // Increment quantity if already in cart
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { productId, quantity: 1 }]);
    }
    
    toast.success("Product added to cart!");
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  // Filter categories based on active tab
  const filteredCategories =
    activeTab === "All" ? categories : categories.filter((category) => category.type === activeTab)

  // Filter products based on active tab and search query
  const filteredProducts = products
    .filter(product => activeTab === "All" || product.type === activeTab)
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen">
      {/* <Sidebar onSectionChange={handleSectionChange} activeSection={activeSection} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header searchQuery={searchQuery} onSearch={handleSearch} cartItems={cart.length} /> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => handleTabChange("All")}
                className={`px-4 py-2 rounded-md ${activeTab === "All" ? "bg-[#8AAE4A] text-white" : "bg-gray-200"}`}
              >
                All
              </button>
              <button
                onClick={() => handleTabChange("Metal")}
                className={`px-4 py-2 rounded-md ${activeTab === "Metal" ? "bg-[#8AAE4A] text-white" : "bg-gray-200"}`}
              >
                Metal
              </button>
              <button
                onClick={() => handleTabChange("Artificial")}
                className={`px-4 py-2 rounded-md ${activeTab === "Artificial" ? "bg-[#8AAE4A] text-white" : "bg-gray-200"}`}
              >
                Artificial
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewModeChange("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-gray-200" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleViewModeChange("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-200" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {activeSection === "categories" ? (
            <CategoryGrid
              categories={filteredCategories}
              viewMode={viewMode}
              onToggleActive={handleToggleActiveCategory}
              onEditCategory={handleEditCategory}
            />
          ) : (
            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              onToggleActive={handleToggleActiveProduct}
              onEditProduct={handleEditProduct}
              onAddToCart={handleAddToCart}
            />
          )}

          <div className="fixed bottom-6 right-6">
            {activeSection === "categories" ? (
              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="flex items-center px-4 py-2 bg-[#8AAE4A] text-white rounded-md"
              >
                <span className="mr-2">+</span>
                Add new category
              </button>
            ) : (
              <button
                onClick={() => setShowAddProductModal(true)}
                className="flex items-center px-4 py-2 bg-[#8AAE4A] text-white rounded-md"
              >
                <span className="mr-2">+</span>
                Add new product
              </button>
            )}
          </div>

        </main>
      </div>

      {showAddCategoryModal && (
        <AddCategoryModal onClose={() => setShowAddCategoryModal(false)} onAdd={handleAddCategory} />
      )}

      {showAddProductModal && (
        <AddProductModal onClose={() => setShowAddProductModal(false)} onAdd={handleAddProduct} />
      )}

      {/* {showAddModal && (
  <AddProductModal
    onClose={() => setShowAddModal(false)}
    onAdd={handleAddProduct}
  />
)} */}


      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default ProductManagement
