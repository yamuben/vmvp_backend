const express = require('express');
const {
    getStory,addStory,updateStory,storyPhotoUpload} = require('../controllers/story');
const router = express.Router();

router
.route('/')
.get(getStory)
.post(addStory)

router
.route('/:id')
.put(updateStory)

router
.route('/:id/photo')
.put(storyPhotoUpload)

module.exports = router;