const { ObjectId } = require("mongodb");
const { connect } = require("../Connections/DatabaseConnection/connection");

async function updateMetal(
  name,
  unit,
  standardPurity,
  standardPurityPrice,
  image,
  variants,
  docId
) {
  try {
    const db = await connect();
    const metalsCollection = db.collection("metals");
    if (!ObjectId.isValid(docId)) {
      console.log("object id not vaid");
      return false;
    }
    /// wirt ehte logics
    const updateFields = {
      ...(name && { name }),
      ...(unit && { unit }),
      ...(standardPurity && { standardPurity }),
      ...(standardPurityPrice && { standardPurityPrice }),
      ...(image && { image }),
      ...(variants && { variants }),
      updatedAt: new Date(),
    };
    const result = await metalsCollection.findOneAndUpdate(
      { _id: new ObjectId(docId) },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    return true;
  } catch (error) {
    console.error("❌ Error updating metal:", error.message);
    return false;
  }
}
module.exports = { updateMetal };
