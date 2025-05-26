const { connect } = require("../../Connections/DatabaseConnection/connection");

async function getCategory() {
  let db;
  try {
    db = await connect();
    const categoryCollection = db.collection("category");
    const categories = await categoryCollection.find({}).toArray();
    console.log("🔍 Categories found:", categories);
    return categories;
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error.message);
    return [];
  }
}

module.exports = { getCategory };
