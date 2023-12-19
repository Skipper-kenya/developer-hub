//global imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

//local imports
import dbConnection from "./db.js";
import { AuthRouter } from "./routes/auth.js";
import { projectsRouter } from "./routes/projects.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/projects", projectsRouter);

const port = process.env.PORT;

const runServer = () => {
  return app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
};

dbConnection(runServer);
