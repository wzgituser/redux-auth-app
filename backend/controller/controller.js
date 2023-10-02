const asyncHandler = require("express-async-handler");
const { User } = require("../model/modejDb");
const { json } = require("express");
const tokenGenerete = require("../util/jwtToken");
//@desc     Auth user account
//route     Get /api/user/profile
//@access   Public

const auth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.machPassword(password))) {
    // generate token with use of the "tokenGenerate" script
    await tokenGenerete(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password!!!");
  }
});
//@desc     Register user account
//route     post /api/user/profile
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // searching for the same email if exists in mongodb

  const findUser = User.findOne({ email });
  // if exiist then throw an err , something wrong with this
  if (!findUser) {
    res.status(400);
    throw new Error("User already exists" + findUser);
  }

  // create an user account
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    const tok = tokenGenerete(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cookie: tok === true ? true : false
    });
  } else {
    res.status(400);
    throw new Error("invalid already exist");
  }
});
//@desc     Logout from the user account
//route     Post /api/user/logout
//@acces    Private

const logoutUser = asyncHandler(async (req, res) => {
  // the process logging out is done,by expire the cooki
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ msg: "User logged out." });
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
