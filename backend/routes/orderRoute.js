const express = require("express");
const {
  createOrder,
  myOrders,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/isAuthenticated");
const router = express.Router();

router.post("/order/new", isAuthenticated, createOrder);
router.get("/order/:id", getOrder);
router.get("/orders/me", isAuthenticated, myOrders);
router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

module.exports = router;
