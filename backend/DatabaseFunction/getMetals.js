const { connect } = require("../Connections/DatabaseConnection/connection");
async function getMetals() {
  let db;
  try {
    db = await connect();
    const metalsCollection = db.collection("metals");
    const metals = await metalsCollection.find({}).toArray();

    return metals;
  } catch (error) {
    console.error("❌ Failed to fetch metals:", error.message);
    return [];
  }
}
module.exports = { getMetals };
