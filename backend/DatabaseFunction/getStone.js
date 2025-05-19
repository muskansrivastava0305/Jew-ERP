const {connect} = require('../Connections/connection')
async function getStones() {
  let db;
  try {
    db = await connect();
    const stonesCollection = db.collection("stones");
    const stones = await stonesCollection.find({}).toArray();
    console.log("🔍 Stones found:", stones);
    return stones;
  } catch (error) {
    console.error("❌Failed to fetch stones:", error.message);
    return [];
  } 
}
module.exports = {getStones}