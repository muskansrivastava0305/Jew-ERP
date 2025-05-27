const { connect } = require("../../Connections/DatabaseConnection/connection");

async function postCategory(url, nameOfCategory, jewelleeryType) {
  try {
    const db = await connect();
    const categoryCollection = db.collection("category");

    const newCategory = {
      image: url,
      categoryName: nameOfCategory,
      jewelleryType: jewelleeryType,
      createdAt: new Date(),
    };

    const result = await categoryCollection.insertOne(newCategory);
    console.log("✅ Category uploaded successfully, ID:", result.insertedId);
    return true;
  } catch (error) {
    console.error("❌ Error uploading category:", error.message);
    return false;
  }
}
module.exports = { postCategory };
