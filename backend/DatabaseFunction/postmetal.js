const Metal = require('../Models/Metal'); // Adjust path if necessary

async function addMetals({
  name,
  price,
  icon = "/placeholder.svg?height=150&width=150",
  unit,
  standardPurity,
  standardPurityPrice,
  addVariants = [],
}) {
  // Basic validation
  if (
    !name || typeof name !== "string" ||
    typeof price !== "number"
  ) {
    throw new Error("Invalid input: 'name' must be a string and 'price' must be a number");
  }

  // Validate addVariants (if provided)
  if (!Array.isArray(addVariants)) {
    throw new Error("Invalid input: 'addVariants' must be an array");
  }


  for (const variant of addVariants) {
    if (
      typeof variant.variantName !== "string" ||
      typeof variant.purity !== "string" ||
      typeof variant.price !== "number"
    ) {
      throw new Error("Each variant must include 'variantName' (string), 'purity' (string), and 'price' (number)");
    }
  }

  const newMetal = new Metal({
    name,
    price,
    icon,
    unit,
    standardPurity,
    standardPurityPrice,
    addVariants
  });

  try {
    const savedMetal = await newMetal.save();
    console.log("✅ Metal uploaded successfully, ID:", savedMetal._id);
    return savedMetal;
  } catch (error) {
    console.error("❌ Error uploading metal:", error.message);
    throw error;
  }
}

module.exports = { addMetals };
