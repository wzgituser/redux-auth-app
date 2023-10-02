const jwt = require("jsonwebtoken");

const tokenGenerete = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    // whriten in patern like "day*hours*minutes*sec*milisec"
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};
module.exports = tokenGenerete;
