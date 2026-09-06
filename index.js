import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { dbConnection } from "./config/dbConnection.js";
import todoRouters from "./routes/todo.router.js";

configDotenv({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/todo", todoRouters);

app.listen(process.env.PORT, () =>
  console.log("Server is running at PORT:", process.env.PORT)
);
