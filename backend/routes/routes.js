const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");
const protect = require("../middleware/authMIddleware.js");

router.post("/auth", controller.auth);
router.post("/reg", controller.registerUser);
router.post("/logout", controller.logoutUser);
// router.post("/user/post", controller.create);
router.get("/get-All", controller.getAll);
router.put("/put", controller.update);
router.post("/del", controller.del);
// protect middleware added
router
  .route("/user")
  .get(protect, controller.auth)
  .put(protect, controller.updateUserProfile);
//check if logged get method
router.get("/logged", controller.checkIflogged);
module.exports = router;
