const Product = require("../models/productModel"); //importing product schema

//create a product -- ADMIN
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  return res.status(201).json({ success: true, product: product });
};

//get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({ success: true, products });
};

//updating a product --ADMIN
exports.updateProduct = async (req, res, next) => {
  //finding the product to be updated
  let productToUpdate = await Product.findById(req.params.id);
  //if wrong id then quit
  if (!productToUpdate) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }
  //product found
  //now update it
  //new:true will return us the updated product
  productToUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({ success: true, productToUpdate });
};
//deleting a product --ADMIN
exports.deleteProduct = async (req, res, next) => {
  //finding the product to be deleted
  let productToDelete = await Product.findById(req.params.id);
  //if wrong id then quit
  if (!productToDelete) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }
  //product found
  //now delete it
  await Product.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
};
//get product details
exports.getProductDetails = async (req, res, next) => {
  //finding the product to be deleted
  let product = await Product.findById(req.params.id);
  //if wrong id then quit
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }
  //product found
  //now send details
  return res.status(200).json({ success: true, product });
};
