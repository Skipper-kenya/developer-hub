import express from "express";

import register from "../controller/register.js";
import login from "../controller/login.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export { router as AuthRouter };
