import userModel from "../../models/userModel.js";

import bcrypt from "bcrypt";

const register = async (req, res) => {
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
};

export default register;
