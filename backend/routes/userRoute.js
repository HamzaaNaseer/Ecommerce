const express = require("express");
const { createUser, login, logout, forgotPassword, resetPassword } = require("../controllers/userController");
const router = express.Router();

router.route("/createuser").post(createUser);
router.post("/login", login);
router.get("/logout", logout)
router.put("/password/reset/:token",resetPassword)
router.post("/password/forgot",forgotPassword)
module.exports = router;
