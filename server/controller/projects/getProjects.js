import projectsModel from "../../models/projectsModel.js";

const getProjects = async (req, res) => {
  try {
    const projects = await projectsModel.find({});

    res.send({ projects });
  } catch (error) {
    console.log(error.message);
  }
};

export default getProjects;
