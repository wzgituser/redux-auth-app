
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res) => {
  res.status(401);
  throw new Error("Something went wrong");
  res.status(200).json({ m: "hopefully it works" });
});
const post = asyncHandler(async (req, res) => {
  res.status(200).json({ m: "post function " });
});
const put = async (req, res) => {
  res.status(200).json({ m: "this is put method" });
};
const del = async (req, res) => {
  try {
    res.status(200).json({ m: "this is delete method" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { auth, post, put, del };
