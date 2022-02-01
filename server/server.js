const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

app.use((req, _res, next) => {
  console.log(`A ${req.method} request was made at ${req.path}`);
  next();
});

//! Use of Multer
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./");
  },
  filename: (req, file, callBack) => {
    const ext = file.mimetype.split("/")[1];
    callBack(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  },
});

var upload = multer({
  storage: storage,
});

const registerRoutes = require("./routes/registerRoutes");
app.use("/register", registerRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/user-routes", userRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
