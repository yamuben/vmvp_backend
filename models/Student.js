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
    default:null
    //required:true
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});


studentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sponsor"
  })
  next();
});

module.exports = mongoose.model("Studen", studentSchema);
