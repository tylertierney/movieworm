import mongoose from "mongoose";
import GroupSchema from "./Group";

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
  username: {
    type: String,
  },
  groups: {
    type: [GroupSchema],
  },
  reviews: {
    type: Array,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
