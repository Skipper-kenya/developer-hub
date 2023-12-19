import mongoose, { Schema } from "mongoose";

const projectsSchema = new Schema({
  ownerName: {
    type: String,
  },
  projectOwner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  skills: [{ type: String, required: true }],
});

const projectsModel = mongoose.model("projects", projectsSchema);
export default projectsModel;
