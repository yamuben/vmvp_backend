const mongoose = require('mongoose');
const sponsorRequestSchema = new mongoose.Schema({
    sponsor:{
        type:mongoose.Schema.ObjectId,
        ref:'Sponsor',
        required:true 
    },
    student:[{
        studentId:{type:mongoose.Schema.ObjectId,
        ref:'Student',
        required:true}},
        {Donation:Number},
        {status:false}],
    status:false

});

module.exports = mongoose.model('SponsorRequest',sponsorRequestSchema);
