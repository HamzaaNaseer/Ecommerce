const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController"); //importing controllers
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/isAuthenticated");

router.get("/getAllProducts", isAuthenticated, getAllProducts);
router.post(
  "/product/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;
