const express = require('express')
const {
    getSponsorRequest,addSponsorRequest,updateSponsorRequest, getSponsorByStudentId} = require ('../controllers/sponsorRequests')
const router = express.Router()

router
.route('/')
.get(getSponsorRequest)
.post(addSponsorRequest)

router
.route('/getone/:id')
.get(getSponsorByStudentId);

router
.route('/update/:id')
.patch(updateSponsorRequest)


module.exports = router
