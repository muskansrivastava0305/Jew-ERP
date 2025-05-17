const { connect } = require('../Connections/connection');

async function addMetals(name, price, image, description) {
  // Basic validation
  if (
    !name || typeof name !== "string" ||
    typeof price !== "number" ||
    !image || typeof image !== "string" ||
    !description || typeof description !== "string"
  ) {
    throw new Error("Invalid input types");
  }

  const newMetal = {
    name,
    price,
    image: image || "/placeholder.svg?height=150&width=150",
    description
  };

  try {
    const db = await connect(); // Assuming connect is your MongoDB connection function
    const metalsCollection = db.collection("metals");
    const result = await metalsCollection.insertOne(newMetal);
    console.log("✅ Metal uploaded successfully, ID:", result.insertedId);
    return result;
  } catch (error) {
    console.error("❌ Error uploading metal:", error.message);
    throw error;
  }
}

module.exports = { addMetals };
