import Metal from "../Models/Metal";

export const getAllMetals = async (req, res) => {
  try {
    const metals = await Metal.find();
    res.json(metals);
  } catch (err) {
    console.error("Failed to fetch metals:", err);
    res.status(500).json({ message: "Server error" });
  }
};
