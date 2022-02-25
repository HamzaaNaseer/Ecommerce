const express = require("express");
const { createUser, login, logout, forgotPassword } = require("../controllers/userController");
const router = express.Router();

router.route("/createuser").post(createUser);
router.post("/login", login);
router.get("/logout", logout)
router.post("/password/forgot",forgotPassword)
module.exports = router;
