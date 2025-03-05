import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import artisanRoutes from "./routes/artisans.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: ["https://www.demandpoint.app", "http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true, // Allow cookies & authorization headers if needed
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/artisans", artisanRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
