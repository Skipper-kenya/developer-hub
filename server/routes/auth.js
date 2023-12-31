import express from "express";

import register from "../controller/auth/register.js";
import login from "../controller/auth/login.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export { router as AuthRouter };
