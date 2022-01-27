const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.route("/register/user").post(controller.addNewUser);

module.exports = router;
