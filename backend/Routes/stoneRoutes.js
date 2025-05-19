import { getStones } from "../DatabaseFunction/getStone";
import Stone from "../Models/Stone";
const {addStones} = require("./../Connections/connection")

export const getAllStones = async (req, res) => {
  try {
    const stones = await Stone.find();
    res.json(stones);
  } catch (err) {
    console.error("Failed to fetch stones:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const postStone = async (req, res) => {
  try {
    console.log("Incoming data is", req.body)
    const{stoneName, stonePrices, stoneImage, stoneDescription} = res.body
   await addStones(stoneName, stonePrices, stoneImage, stoneDescription)
   
   res.json(abs);
  } catch (err) {
    console.error("Failed to fetch stones:", err);
    res.status(500).json({ message: "Server error" });
  }
};
//post metal=> okay
//get =>all data
//ppost metal => old data + newly added metal