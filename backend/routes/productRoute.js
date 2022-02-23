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

router.get("/getAllProducts",isAuthenticated, authorizeRoles("admin"), getAllProducts);
router.post("/product/new", isAuthenticated, createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct)
  .get(getProductDetails);

module.exports = router;
