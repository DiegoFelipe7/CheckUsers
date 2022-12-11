const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const farmsRouter = require("./router/userRouter");
const exphbs = require("express-handlebars");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");
app.use(cors());
app.use(express.json());
app.use("/farms", farmsRouter);
app.use("/public", express.static(path.join(__dirname, "public")));

exports.app = functions.https.onRequest(app);
