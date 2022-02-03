const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.DB_URI, () => {
    console.log("connected to mongoose sucessfully");
  });
};

module.exports = connectToMongo;
