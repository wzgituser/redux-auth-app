
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res) => {
  res.status(200).json({ m: "hopefully it works" });
});
module.exports = { auth };
