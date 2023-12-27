import userModel from "../../models/userModel.js";

import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.send({ message: "user does not exist!" });
  }

  bcyrpt.compare(password, user.password, async (err, result) => {
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
};

export default login;
