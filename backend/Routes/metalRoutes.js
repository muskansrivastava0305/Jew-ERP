import Metal from "../Models/Metal";
const {addMetals} = require("./../Connections/connection")

export const getAllMetals = async (req, res) => {
  try {
    const metals = await Metal.find();
    res.json(metals);
  } catch (err) {
    console.error("Failed to fetch metals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const postMetal = async (req, res) => {
  try {
    console.log("Incoming data is", req.body)
    const{metalName, metalPrices, metalImage, metalDescription} = res.body
    addMetals(metalName, metalPrices, metalImage, metalDescription)
    res.json(metals);
  } catch (err) { 
    console.error("Failed to fetch metals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

