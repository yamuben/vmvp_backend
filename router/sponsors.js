const express = require('express');
const{
    getSponsors,addSponsor,updateSponsor
} = require('../controllers/sponsors');

const router = express.Router();

//Include other resource routers
const studentRoute = require('./students');

// Route into other resource routers
router.use('/sponsorId',studentRoute);

router
.route('/')
.get(getSponsors)
.post(addSponsor)

router
.route('/:id')
.put(updateSponsor)

module.exports = router;