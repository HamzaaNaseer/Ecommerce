const express = require("express");
const cookieParser = require("cookie-parser");
//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1/user", user);

module.exports = app;
