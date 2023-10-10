const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../model/modejDb");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  // works only with cookis-parser
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // should access logged user acount, find by id minus password ???
      // the err was res. in place of req.
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("401-unauthorized, token invalid");
  }
});
module.exports = protect;
