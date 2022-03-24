const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  name: String,
  picture: String,
  title: String,
  role:{
      type: String,
      enum:["board","team"],
      default:"board"
  },
  description: String,
  status: {
    type: Boolean,
    default: true,
  },
  socialMedia: {
    linkedin: String,
    facebook: String,
    instagram: String,
    twitter: String,
  },
});

module.exports = mongoose.model("Teammate", teamSchema);
