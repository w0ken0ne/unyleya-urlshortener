const mongoose = require("mongoose");

const URLSchema = mongoose.Schema({
  seedUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", URLSchema);
