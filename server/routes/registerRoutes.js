const express = require("express");
const router = express.Router();

const controller = require("../controllers/registerController");

router.route("/user").post(controller.addNewUser);
router.route("/getid/:email").get(controller.getId);
router.route("/dog").post(controller.addDog);

module.exports = router;
