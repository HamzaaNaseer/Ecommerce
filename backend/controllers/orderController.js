const Order = require("../models/orderModel"); //importing order schema
const Product = require("../models/productModel"); //importing product schema

//creating order route -- requires login
exports.createOrder = async (req, res) => {
  try {
    //destructure the req object
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.log("error is ", error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

//route for getting an order with id
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "No order found with provided id" });
    }
    //order found here
    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//route for getting loged in user orders -- login required
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.status(201).json({ success: true, orders });
  } catch (error) {
    console.log("error is ", error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

//route for getting all orders -- ADMIN
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    //counting the sum of money of all the orders
    //just counting so the admin should know
    let totalPrice = 0;
    orders.forEach((order) => {
      totalPrice += order.totalPrice;
    });
    return res.status(201).json({ success: true, totalPrice, orders });
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//route for updating  order  -- ADMIN
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "No order found with provided id" });
    }
    //if the order is already delivered it can't be updated
    if (order.orderStatus === "Delivered") {
      return res
        .status(400)
        .json({ message: "you have already delivered this order" });
    }
    order.orderItems.forEach(async (items) => {
      //updating stock in the database
      await updateStock(items.product, items.quantity);
    });
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

async function updateStock(prodId, quantity) {
  const product = await Product.findById(prodId);
  //minus the order quantity from product stock
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//route for deleting order -- ADMIN
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "No order found with provided id" });
    }
    await order.remove();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
