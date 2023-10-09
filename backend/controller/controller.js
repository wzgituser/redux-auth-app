const asyncHandler = require("express-async-handler");
const { User } = require("../model/modejDb");
const { json } = require("express");
const tokenGenerete = require("../util/jwtToken");
const jwt = require("jsonwebtoken");
//@desc     Auth user account
//route     Get /api/user/profile
//@access   Public

const auth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // finding the vlue inside "User" model
  const user = await User.findOne({ email });

  if (user && (await user.machPassword(password))) {
    // generate's token with use of the "tokenGenerate" bcrypt methode
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
      email: user.email
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
//@desc     getAll user profile
//route     Get /api/user/update
//@access   Private
const getAll = asyncHandler(async (req, res) => {
  const getUsers = await User.find();
  if (getUsers) {
    try {
      res.status(200).json({ getUsers });
    } catch (error) {
      res.status(404);
      throw new Error(error);
    }
  } else {
    res.status(404);
    new Error("error not foound code 404");
  }
});
//@desc     Delete user profile
//route     Delete  /api/user/delete/:id
//@access   Private
const del = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const findUser = await User.findOne({ name, email });
  ///////////////////////////////////////////////////////////////do not forget to add a uath confirmation
  console.log(findUser);
  if (findUser) {
    const delUser = await findUser.deleteOne();
    if (delUser) {
      res.status(201).json({
        msg: `user with name: ${name} and email: ${email} was deleted`
      });
    }
  } else {
    res.status(404);
    throw new Error("user not deleted err 404");
  }
});
// @desc    Update user profile
// @route   PUT /api/users/profile ?????????????????/
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// TEST- check if logged/////////////
const checkIflogged = asyncHandler(async (req, res) => {
  let token;
  // works only with cookis-parser
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // should access logged user acount, find by id minus password ???
      if (decoded) {
        res.status(201).json({ msg: "cooki-OK" });
      }
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("401-unauthorized, token invalid");
  }
});
module.exports = {
  auth,
  registerUser,
  create,
  logoutUser,
  update,
  del,
  getAll,
  updateUserProfile,
  checkIflogged
};
