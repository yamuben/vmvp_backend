const express = require('express');
const { 
    getTeam,addTeam,updateTeam, teamPhotoUpload,getTeamAll
} = require('../controllers/team');
const router = express.Router();

router
.route('/')
.get(getTeam)
.post(addTeam)

router
.route('/all')
.get(getTeamAll)

router
.route('/:id')
.patch(updateTeam)

router
.route('/:id/photo')
.put(teamPhotoUpload)

module.exports = router;