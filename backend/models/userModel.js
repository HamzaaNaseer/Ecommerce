const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

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
userSchema.pre('save', async function (next){
    //hash your password here 
})

module.exports = mongoose.model("User", userSchema);
