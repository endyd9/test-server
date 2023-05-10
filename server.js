import express from "express";
import session from "express-session";
import mysql from "mysql";
import { router } from "./src/router.js";
import dotenv from "dotenv";

const app = express();

const port = 4000;

dotenv.config();
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cokie: { maxAge: 10000 },
  })
);

const listener = () => {
  console.log(`server on port ${port}`);
};

app.listen(port, listener);
app.use("/", router);
