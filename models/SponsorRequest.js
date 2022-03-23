const mongoose = require("mongoose");
const sponsorRequestSchema = new mongoose.Schema({
  sponsor: {
    type: mongoose.Schema.ObjectId,
    ref: "Sponso",
    required: true,
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "Studen",
    required: true,
  },
  donation: Number,
  status: {
    type: String,
    enum: ["pending", "declined", "accepted"],
    default: "pending",
  }
});


sponsorRequestSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sponsor"
  });
  this.populate({
      path:"student"
  });
  next();
});

module.exports = mongoose.model("SponsorReques", sponsorRequestSchema);
