const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

//use express static folder
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
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

// routes for sql in progress
// const routes = require("./routes/userRoutes");
// app.use("/", routes);

const routes = require("./routes/routes");
app.use("/", routes);

// Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
