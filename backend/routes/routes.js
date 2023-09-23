const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");

router.get("/user/get", controller.auth);
router.post("/user/post", controller.post);
router.put("/user/put", controller.put);
router.delete("/user/delete", controller.del);
console.log(controller.auth);
module.exports = router;
