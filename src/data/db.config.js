const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGODB_URI);
const connectDB = async () => {
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
