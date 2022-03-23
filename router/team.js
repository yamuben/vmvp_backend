const express = require('express');
const { 
    getTeam,addTeam,updateTeam, teamPhotoUpload
} = require('../controllers/team');
const router = express.Router();

router
.route('/')
.get(getTeam)
.post(addTeam)

router
.route('/:id')
.patch(updateTeam)

router
.route('/:id/photo')
.put(teamPhotoUpload)

module.exports = router;