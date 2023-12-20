import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (user) {
    return res.send({ message: "user already exists!" });
  }

  const userRole = (name) => {
    if (name === "Andrew") {
      return "admin";
    }

    return "basic";
  };

  const dbRole = userRole(username);

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username,
    password: hashPassword,
    role: dbRole,
  });
  await newUser.save();

  return res.send({ message: "user successfully registered!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.send({ message: "user does not exist!" });
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      console.log("error comparing password");
    } else {
      if (result) {
        const token = jwt.sign({ id: user._id }, "rastaGang");
        res.cookie("access", token);
        return res.send({
          token,
          userId: user._id,
          userName: user.username,
          message: "Successfull login",
        });
      } else {
        return res.send({ message: "Password mismatch!" });
      }
    }
  });
});

export { router as AuthRouter };
