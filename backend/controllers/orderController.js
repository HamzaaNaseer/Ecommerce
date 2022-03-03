const Order = require("../models/orderModel"); //importing order schema

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
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "No order found with provided id" });
    }
    //order found here
    return res.status(201).json({ success: true, order });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

//route for getting orders -- login required
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
