const Product = require("../models/productModel"); //importing product schema
const ApiFeatures = require("../utils/apifeatures");

//TODO:ERROR HANDELING

//create a product -- ADMIN
exports.createProduct = async (req, res) => {
  try {
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, product: product });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//get all products
exports.getAllProducts = async (req, res) => {
  const resultPerpage = 2;
  try {
    const totalProducts = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerpage);
    const products = await apiFeature.query;
    return res.status(200).json({ success: true, totalProducts, products });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

//updating a product --ADMIN
exports.updateProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
//deleting a product --ADMIN
exports.deleteProduct = async (req, res) => {
  try {
    //finding the product to be deleted
    //get product details
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
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

exports.getProductDetails = async (req, res, next) => {
  try {
    //finding the product to get the details
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
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
