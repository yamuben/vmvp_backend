const express = require('express')
const {
    getSponsorRequest,addSponsorRequest,updateSponsorRequest} = require ('../controllers/sponsorRequests')
const router = express.Router()

router
.route('/')
.get(getSponsorRequest)
.post(addSponsorRequest)

router
.route('/:id')
.put(updateSponsorRequest)

module.exports = router
