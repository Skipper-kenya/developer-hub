import projectsModel from "../../models/projectsModel.js";
import userModel from "../../models/userModel.js";

import { ObjectId } from "mongodb";

const createProject = async (req, res) => {
  const { userId, projDetails, username } = req.body;
  const { name, description, link, skills } = projDetails;

  const user = await userModel.findById({ _id: userId });

  try {
    if (user) {
      const newProject = new projectsModel({
        ownerName: username,
        projectOwner: userId,
        name,
        description,
        link,
        skills,
      });

      await newProject.save();

      const userProjects = await projectsModel
        .find({ projectOwner: userId })
        .findOne()
        .sort({ createdAt: -1 })
        .select("_id");

      const latestProjectId = userProjects._id.toString();
      user.projects.push(latestProjectId);
      await user.save();

      res.send({
        message: "Project saved",
        action: "success",
      });
      console.log("project saved");
    }
  } catch (error) {
    console.log(`error:projects route${error.message}`);
  }
};

export default createProject;
