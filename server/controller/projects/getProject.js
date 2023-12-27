import { ObjectId } from "mongodb";

import projectsModel from "../../models/projectsModel.js";
const getProject = async (req, res) => {
  const userId = req.params.id;

  if (userId) {
    try {
      const myProjects = await projectsModel.find({
        projectOwner: new ObjectId(userId),
      });
      res.send({ myProjects });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("user id is undefined");
  }
};

export default getProject;
