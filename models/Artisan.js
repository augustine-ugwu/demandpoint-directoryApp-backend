import mongoose from "mongoose";

const ArtisanSchema = new mongoose.Schema({
  profilePicture: String,
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  minPrice: Number,
  maxPrice: Number,
});

export default mongoose.model("Artisan", ArtisanSchema);
