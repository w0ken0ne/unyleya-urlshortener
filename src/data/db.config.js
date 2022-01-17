const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const connectDB = async () => {
  console.log(`THERE IT IS: ${process.env.MONGODB_URI} -- ${Date.now()}`);
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Conectado...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
