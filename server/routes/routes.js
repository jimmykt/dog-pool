const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.route("/login").post(controller.loginUser);
router.route("/current").get(controller.getCurrentUser);

router.route("/pool").post(controller.addToPool);
router.route("/pool-remove").delete(controller.removeFromPool);

module.exports = router;
