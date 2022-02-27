const express = require("express");
const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/createuser").post(createUser);
router.post("/login", login);
router.get("/logout", logout);
router.put("/password/reset/:token", resetPassword);
router.post("/password/forgot", forgotPassword);
router.get("/me", isAuthenticated, getUserDetails);
router.put("/password/update", isAuthenticated, updatePassword);
router.put("/me/updateProfile", isAuthenticated, updateProfile);

module.exports = router;
