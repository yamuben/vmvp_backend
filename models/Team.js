const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    name:String,
    picture:String,
    title:String,
    description:String,
    status:String,
    socialMedia:['Linkedin','Facebook','Instagram','Twitter']
});

module.exports = mongoose.model('Team',teamSchema);