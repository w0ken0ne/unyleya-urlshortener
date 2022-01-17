const mongoose = require("mongoose");

const URLSchema = mongoose.Schema({
  seedUrl: String,
  shortUrl: String,
  createdAt: Date,
});

module.exports = mongoose.model("Url", URLSchema);
