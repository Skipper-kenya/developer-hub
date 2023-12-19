import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projectsModel",
    },
  ],
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
