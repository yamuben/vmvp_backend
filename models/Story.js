const mongoose = require("mongoose");
const storyschema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("Story", storyschema);
