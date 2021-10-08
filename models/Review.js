import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const ReviewSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: [true, "Please provide a name for this movie"],
  },
  review_text: {
    type: String,
    required: [true, "Please provide a review of this movie"],
    maxlength: [400, "Reviews may not exceed 400 characters"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide a numeric rating for this movie"],
  },
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
