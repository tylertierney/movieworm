import mongoose from "mongoose";
import Group from "./Group";

const UserSchema = new mongoose.Schema({
  tenant: {
    type: String,
  },
  connection: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  debug: {
    type: Boolean,
  },
  email_verified: {
    type: Boolean,
  },
  owned_groups: {
    type: [Group],
  },
  joined_groups: {
    type: [Group],
  },
  reviews: {
    type: Array,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
