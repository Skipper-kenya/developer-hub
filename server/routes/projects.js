import express from "express";

import { verifyCreateToken, verifyToken } from "../middlewares/verifyToken.js";

import createProject from "../controller/projects/createProject.js";
import getProjects from "../controller/projects/getProjects.js";
import getProject from "../controller/projects/getProject.js";

const router = express.Router();

//A REQUEST TO CREATE NEW PROJECT BY AUTHENTICATED USERS
router.put("/", verifyCreateToken, createProject);

router.get("/:token", verifyToken, getProjects);
//get req with token and id:
router.get("/my_projects/:id/:token", verifyToken, getProject);

export { router as projectsRouter };
