const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
name:String,
dateOfBirth:String,
class:String,
problemOne:String,
problemTwo:String,
picture:String,
dream:String,
sponsor:{
    type:mongoose.Schema.ObjectId,
    ref:'Sponsor',
    //required:true 
},
isAvailable:false
});
module.exports = mongoose.model('Student',studentSchema);