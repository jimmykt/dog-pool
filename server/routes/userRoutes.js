const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.route("/register/user").post(controller.addNewUser);
router.route("/register/dog").post(controller.addDog);

router.route("/login").post(controller.loginUser);

router.route("/getid/:email").get(controller.getId);

module.exports = router;
