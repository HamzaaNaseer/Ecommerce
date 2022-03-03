const express = require("express");
const {
  createOrder,
  myOrders,
  getOrder,
} = require("../controllers/orderController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = express.Router();

router.post("/order/new", isAuthenticated, createOrder);
router.get("/order/:id", getOrder);
router.get("/order/myOrders", isAuthenticated, myOrders);

module.exports = router;
