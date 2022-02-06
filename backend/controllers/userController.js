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
    res.status(500).json({ success: false, message: error.message });
  }
};
