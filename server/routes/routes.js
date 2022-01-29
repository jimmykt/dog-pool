const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.route("/login").post(controller.loginUser);
router.route("/current").get(controller.getCurrentUser);

module.exports = router;
