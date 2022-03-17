const mongoose = require('mongoose');
const sponsorSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
    unique: true,
  },
  donation: Number,
  country: String,
  phoneNumber: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model('Sponsor', sponsorSchema);
