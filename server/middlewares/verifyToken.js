import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const accessToken = req.params.token;
  if (!accessToken) {
    return res.status(404).json({ message: "No token provided" });
  }

  try {
    const isTokenValid = jwt.verify(accessToken, "rastaGang");
    if (isTokenValid) {
      next();
    } else {
      res.status(404).json({ message: "The tokem provided is not valid" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyCreateToken = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(404).json({ message: "No token provided" });
  }

  try {
    const isTokenValid = jwt.verify(token, "rastaGang");
    if (isTokenValid) {
      next();
    } else {
      res.status(404).json({ message: "The token provided is not valid" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { verifyCreateToken, verifyToken };
