const app = require("./app");
const dotenv = require("dotenv");
const connectToMongo = require("./config/db");

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting to db
connectToMongo();

app.listen(process.env.PORT, () => {
  console.log(
    `server is running on  on port http://localhost:${process.env.PORT}`
  );
});
