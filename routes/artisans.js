import express from "express";
import Artisan from "../models/Artisan.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Config (for image uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "artisans" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// ✅ Register Artisan
router.post("/register", upload.single("profilePicture"), async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      state,
      city,
      specialty,
      experience,
      minPrice,
      maxPrice,
    } = req.body;

    // Upload image to Cloudinary if provided
    let profilePicture = "";
    if (req.file) {
      try {
        profilePicture = await uploadToCloudinary(req.file.buffer);
      } catch (error) {
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    // Create and save artisan
    const artisan = new Artisan({
      fullName,
      phone,
      email,
      state,
      city,
      specialty,
      experience,
      minPrice,
      maxPrice,
      profilePicture,
    });

    await artisan.save();
    res
      .status(201)
      .json({ message: "Artisan registered successfully", artisan });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Fetch all Artisans
router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artisans" });
  }
});

// ✅ Search Artisans by State/City
router.get("/search", async (req, res) => {
  try {
    const { state, city } = req.query;
    const query = {};
    if (state) query.state = state;
    if (city) query.city = city;

    const artisans = await Artisan.find(query);
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
