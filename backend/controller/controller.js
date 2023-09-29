const asyncHandler = require("express-async-handler");

//@desc     Auth user account
//route     Get /api/user/profile
//@access   Public

const auth = asyncHandler(async (req, res) => {
  res.status(200).json({ m: "hopefully it works" });
});
//@desc     Auth user account
//route     Get /api/user/profile
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ m: "register" });
});
//@desc     Logout from the user account
//route     Post /api/user/logout
//@acces    Private
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ m: "logout" });
});

//@desc     Creacte user profile
//route     Post /api/user/create
//@access   Private
const create = asyncHandler(async (req, res) => {
  res.status(200).json({ m: "post function " });
});
//@desc     Update user profile
//route     Put /api/user/update
//@access   Private
const update = async (req, res) => {
  res.status(200).json({ m: "this is put method" });
};
//@desc     Delete user profile
//route     Delete  /api/user/delete/:id
//@access   Private
const del = async (req, res) => {
  try {
    res.status(200).json({ m: "this is delete method" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { auth, registerUser, create, logoutUser, update, del };
