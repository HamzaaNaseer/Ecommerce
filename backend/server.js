const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary"); //for storing images on cloud
const connectToMongo = require("./config/db");

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting to db
connectToMongo();

//configurin cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(
    `server is running on  on port http://localhost:${process.env.PORT}`
  );
});
