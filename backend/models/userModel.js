const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); //for generating password reset tokens

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name required"],
    minlength: [5, "name should atleast be 5 chars"],
    maxlength: [30, "name should not exceed 30 chars "],
  },
  email: {
    type: String,
    required: [true, " email is required "],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [8, "password should be atleast 8 characters"],
    select: false, // not show this feild when finding users
  },
  role: {
    type: String,
    default: "user",
  },
  //TODO : resetpwtoken, resetpwexpire,role('duser'),avatar
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//generate jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//compare the user entered password with the hash
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//function to create password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding resetPassword token to user schema
  this.resetPasswordToken = crypto
    .Hash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //expires after 15mins

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
