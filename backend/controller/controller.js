const auth = (req, res) => {
  res.status(200).json({ m: "hopefully it works" });
};
module.exports = { auth };
