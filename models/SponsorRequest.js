const mongoose = require('mongoose');
const sponsorRequestSchema = new mongoose.Schema({
  sponsor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sponsor',
    required: true,
  },
  student: [
    {
      studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        //required: true,
      },
      donation: Number,
      status: {
        type: Boolean,
        default: true,
      },
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('SponsorRequest', sponsorRequestSchema);
