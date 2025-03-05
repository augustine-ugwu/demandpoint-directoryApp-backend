import express from "express";
import Artisan from "../models/Artisan.js";

const router = express.Router();

// ✅ Register Artisan
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      state,
      city,
      specialty,
      experience,
      profilePicture,
    } = req.body;

    const artisan = new Artisan({
      fullName,
      phone,
      email,
      state,
      city,
      specialty,
      experience,
      profilePicture,
    });

    await artisan.save();
    res
      .status(201)
      .json({ message: "Artisan registered successfully", artisan });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
});

// ✅ GET All Artisans
router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Fetch Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch artisans", details: error.message });
  }
});

export default router;
