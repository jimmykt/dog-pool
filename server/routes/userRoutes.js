const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.route("/login").post(controller.loginUser);
router.route("/current").get(controller.getCurrentUser);
router.route("/current-dog/:id").get(controller.getCurrentDog);

module.exports = router;
