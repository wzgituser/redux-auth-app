const express = require("express");
const router = express.Router();
const { auth } = require("../controller/controller.js");

router.get("/get", auth);

module.exports = router;
