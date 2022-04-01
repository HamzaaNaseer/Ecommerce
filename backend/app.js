const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload"); //for uploadign files to cloudinary
//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1/user", user);
app.use("/api/v1", order);

module.exports = app;
