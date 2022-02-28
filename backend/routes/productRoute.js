const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
} = require("../controllers/productController"); //importing controllers
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/isAuthenticated");

router.get("/getAllProducts", getAllProducts);
router.post(
  "/product/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.get("/product/:id", getProductDetails);
router.put("/review", isAuthenticated, createProductReview);

module.exports = router;
