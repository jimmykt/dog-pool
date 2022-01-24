// dependencies
const express = require("express");
const cors = require("cors");

const app = express();

// config
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`A ${req.method} request was made at ${req.path}`);
  next();
});

// routes
const routes = require("./routes/routes");
app.use("/", routes);

// Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
