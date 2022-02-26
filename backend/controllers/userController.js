const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail.js");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    //converting the password into hash
    //salt is auto generated

    var hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ name, email, password: hash, avatar });
    generateToken(user, 201, res);
  } catch (error) {
    console.log("error is ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//login user
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
    //if password does not match then quit
    if (!passwordMatched) {
      return res.json({
        success: false,
        message: "pls enter correct credentials",
      });
    }
    generateToken(user, 200, res);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//logout user

exports.logout = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  return res.status(200).json({ success: true, message: "logged out" });
};

//forgot password

exports.forgotPassword = async (req, res) => {
  //get the user who is requesting for password reset
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      return res.json({ success: false, message: "no user found" });
    }
    //now create token
    const resetToken = user.getResetPasswordToken();

    //user.save() because getResetPasswordToken function makes changing to the user
    //and those needed to be saved
    await user.save({ validateBeforeSave: false });
    console.log(user);

    //creating a reset password url
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    //message that will be sent in the email
    const message = `your password reset token is below : \n\n ${resetPasswordUrl} \n if you have not requested for this then simply ignore this mail`;

    //sending email
    await sendEmail({
      email: user.email,
      subject: "reset password",
      message,
      resetPasswordUrl
    });
    return res.status(201).json({
      success: true,
      message: `email sent successfully to ${user.email}`,
    });
  } catch (error) {
    console.log(error);

    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    console.log(user);
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ success: false, message: error.message });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  //creating token hash
  const resetPasswordToken = crypto
    .Hash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.json({
      success: false,
      message: "reset password token is invalid or has been expred",
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.json({
      success: false,
      message: "password does not match",
    });
  }
  var hash = bcrypt.hashSync(req.body.password, 10);
  user.password = hash;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  generateToken(user, 200, res);
};
