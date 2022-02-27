const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "login to access this resource",
    });
  }

  //extracting user from token
  const data = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(data.id);
  next();
};

//middleware that checks that if a person requesting is authorized to access
exports.authorizeRoles = (...roles) => {
  //returning a function because i want to pass roles
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "not allowed to access this resource" });
    }
    console.log("testing");
    next();
  };
};
