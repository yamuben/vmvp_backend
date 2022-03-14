const mongoose = require('mongoose');
const sponsorSchema = new mongoose.Schema({
    name:String,
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please add a valid email']
    },
    country:String,
    phoneNumber:String,
    isActive:false,
    status:false

})
module.exports = mongoose.model('Sponsor',sponsorSchema);