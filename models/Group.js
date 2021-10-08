import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this group."],
    maxlength: [30, "Group name cannot exceed 30 characters"],
  },
  group_id: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
  },
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
