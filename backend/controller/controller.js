// library "express-async-handler let user to not use try/catch"
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res) => {
  res.status(200).json({ m: "hopefully it works" });
});
module.exports = { auth };
