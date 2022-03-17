const express = require('express');
const {
  getSponsors,
  addSponsor,
  updateSponsor,
} = require('../controllers/sponsors');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSponsors).post(addSponsor);

router.route('/:id').put(updateSponsor);

router.route('/:studentId');

module.exports = router;
