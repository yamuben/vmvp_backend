const mongoose = require('mongoose');
const storyschema = new mongoose.Schema({
    picture:String,
    description:String,
    status:false
})

module.exports = mongoose.model('Story',storyschema);