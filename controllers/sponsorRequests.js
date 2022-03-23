const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const SponsorRequest = require("../models/SponsorRequest");
const StudentInfos = require("../models/Student");

// @ Desc Get all sponsorRequest
// @ Route GET /api/v1/sponsorRequest
// @ Access Public
exports.getSponsorRequest = asyncHandler(async (req, res, next) => {
  const sponsorRequest = await SponsorRequest.find();
  res.status(200).json({
    success: true,
    count: sponsorRequest.length,
    data: sponsorRequest,
  });
});
// @ Desc Get all sponsorRequest
// @ Route GET /api/v1/sponsorRequest
// @ Access Public
exports.getSponsorByStudentId = asyncHandler(async (req, res, next) => {
  // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
  const sponsorRequest = await SponsorRequest.find();
  res.status(200).json({
    success: true,
    // count: sponsorRequest.length,
    data: sponsorRequest,
  });
});
// @ Desc Add sponsorRequest
// @ Route POST /api/v1/sponsorRequest
// @ Access Private
exports.addSponsorRequest = asyncHandler(async (req, res, next) => {
  const sponsorRequest = await SponsorRequest.create(req.body);
  res.status(200).json({
    success: true,
    data: sponsorRequest,
  });
});

// @ Desc Update sponsorRequest
// @ Route PUT /api/v1/sponsorRequest/:id
// @ Access Private
exports.updateSponsorRequest = asyncHandler(async (req, res, next) => {
  const sponsorRequest = await SponsorRequest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!sponsorRequest) {
    next(new ErrorResponse(`No Resource with the id ${req.params.id}`), 404);
  }

  if(req.body?.status=== "declined"){
   const std= await StudentInfos.findByIdAndUpdate(sponsorRequest?.student._id,{isAvailable:true,sponsor:null},{new:true})
  //  console.log("####",std)
  }
  else if(req.body?.status=== "accepted"){
    await StudentInfos.findByIdAndUpdate(sponsorRequest?.student._id,{isAvailable:false,sponsor:sponsorRequest?.sponsor._id},{new:true})

  }
  // console.log(sponsorRequest)
  res.status(201).json({
    success: true,
    data: sponsorRequest,
  });
});
