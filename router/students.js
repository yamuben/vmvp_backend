const express = require('express');
const {
  getStudents,
  addStudent,
  updateStudent,
  studentPhotoUpload,
} = require('../controllers/students');
//const { addSponsor } = require('../controllers/sponsors');

//Include other resource routers
const sponsorRoute = require('./sponsors');

const router = express.Router();

// Re-route into other resource routers
router.use('/:studentId/sponsor', sponsorRoute);

router.route('/').get(getStudents).post(addStudent);

router.route('/:id').put(updateStudent);

router.route('/:id/photo').put(studentPhotoUpload);

module.exports = router;
