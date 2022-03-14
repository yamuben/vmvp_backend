const express = require('express');
const{
    getStudents,addStudent,updateStudent,studentPhotoUpload
} = require('../controllers/students')

const router = express.Router({ mergeParams: true});

router
.route('/')
.get(getStudents)
.post(addStudent)

router
.route('/:id')
.put(updateStudent)

router
.route('/:id/photo')
.put(studentPhotoUpload)

module.exports = router;