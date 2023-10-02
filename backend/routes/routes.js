const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");

router.post("/auth", controller.auth);
router.post("/reg", controller.registerUser);
router.post("/logout-user", controller.logoutUser);
// router.post("/user/post", controller.create);
router.put("/put", controller.update);
router.delete("/del", controller.del);
// const automation = router
//   .route("/user")
//   .get(controller.auth)
//   .put(controller.logoutUser);
// console.log(automation);

module.exports = router;
