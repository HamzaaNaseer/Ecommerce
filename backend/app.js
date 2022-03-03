const express = require("express");
const cookieParser = require("cookie-parser");
//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1/user", user);
app.use("/api/v1", order);

module.exports = app;
