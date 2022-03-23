const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  gender: String,
  class: String,
  problemOne: String,
  problemTwo: String,
  picture: String,
  dream: String,
  sponsor: {
    type: mongoose.Schema.ObjectId,
    ref: "Sponso",
    //required:true
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Studen", studentSchema);
