const Product = require("../models/productModel"); //importing product schema
const ApiFeatures = require("../utils/apifeatures");

//TODO:ERROR HANDELING

//create a product -- ADMIN
exports.createProduct = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, product: product });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//get all products

exports.getAllProducts = async (req, res) => {
  const resultPerPage = 8;
  try {
    const productCount = await Product.countDocuments(); //product count
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone(); //using clone bcz we cannot run same query twice

    return res.status(200).json({
      success: true,
      productCount,
      products,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).json({
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
//get product details
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
//creating a product review
exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  //TODO :: FIND THE PRODUCT ON WHICH WE ARE GIVING THE REVIEW
  const product = await Product.findById(productId);
  //TODO :: CREATE A NEW REVIEW OBJECT WITH ALL THE REQUIED FEILDS

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user.id,
  };

  //TODO :: CHECK IF THE REVIEW BY THE USER ALREADY EXISTS
  const isAlreadyReveiwed = product.reviews.find(
    (r) => String(r.user) === String(req.user.id)
  );
  //TODO :: IF IT EXISTS UPDATE IT IF NOT CREATE A NEW REVIEW
  if (isAlreadyReveiwed) {
    product.reviews.forEach((r) => {
      if (String(r.user) === String(req.user.id)) {
        r.rating = rating;
        r.comment = comment;
      }
    });
  } else {
    //simply pushing the review in the array
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let sum = 0;
  product.reviews.forEach((r) => {
    sum += r.rating;
  });
  const avg = sum / product.reviews.length || 0;
  product.ratings = avg;

  await product.save({ validateBeforeSave: false });
  return res.status(200).json({ sucess: true });
};

//route for getting all product reviews
exports.getAllReviews = async (req, res, next) => {
  // selecting product of which we want reviews
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }
  //now product has been found
  return res.status(200).json({ success: true, reviews: product.reviews });
};

//route for deleting a review
exports.deleteReview = async (req, res, next) => {
  // selecting product of which we want to delete a review
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }
  //now product has been found

  //TODO:: MAKE SURE THE USER IS DELETING HIS OWN REVIEWS
  const reviews = product.reviews.filter(
    //this will not filter the review that we wants to delete
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );
  let sum = 0;
  reviews.forEach((r) => {
    sum += r.rating;
  });
  const avg = sum / reviews.length || 0;
  ratings = avg;
  numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    }
  );

  return res.status(200).json({ success: true });
};
