const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    //converting the password into hash
    //salt is auto generated

    var hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ name, email, password: hash, avatar });
    const token = user.getJWTToken();
    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.log("error is ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
//TODO : CREATE LOGIN FUNCTION

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //if email or pw not provided , quit
    if (!email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "please enter email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    //if no user with that email then quit
    if (!user) {
      return res.json({
        success: false,
        message: "pls enter correct credentials",
      });
    }
    const passwordMatched = await user.comparePassword(password);
    console.log(passwordMatched);
    //if password does not match then quit
    if (!passwordMatched) {
      return res.json({
        success: false,
        message: "pls enter correct credentials",
      });
    }
    const token = user.getJWTToken();
    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
