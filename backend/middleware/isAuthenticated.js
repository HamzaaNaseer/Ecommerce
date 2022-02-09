const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "no token found" });
  }

  //extracting user from token
  const data = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(data.id);

  next();
};
