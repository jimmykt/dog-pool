const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.route("/login").post(controller.loginUser);
router.route("/current").get(controller.getCurrentUser);

router
  .route("/pool")
  //add one to pool
  .post(controller.addToPool)
  //get all in pool
  .get(controller.getAllPool);

router.route("/pool/:id").delete(controller.removeFromPool);

module.exports = router;
