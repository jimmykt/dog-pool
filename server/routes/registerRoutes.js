const express = require("express");
const router = express.Router();

const controller = require("../controllers/registerRoutes");

router.route("/register/user").post(controller.addNewUser);
router.route("/getid/:email").get(controller.getId);
router.route("/register/dog").post(controller.addDog);

router.route("/login").post(controller.loginUser);
router.route("/current").get(controller.getCurrentUser);

router.route("/get-dog-by/:id").get(controller.getUserDog);

module.exports = router;
