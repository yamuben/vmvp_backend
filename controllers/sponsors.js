const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Sponsor = require('../models/Sponsor');


// @ Desc Get all sponsors
// @ Route GET /api/v1/sponsors
// @ Access Public
exports.getSponsors=  asyncHandler(async (req,res,next)=>{

    const sponsor = await Sponsor.find();
    res.status(200).json({
        success:true,
        count: sponsor.length,
        data: sponsor
    });
});

// @ Desc Add sponsor
// @ Route POST /api/v1/sponsors/
// @ Access Private
exports.addSponsor = asyncHandler(async(req,res,next)=>{

    const sponsor = await Sponsor.create(req.body)
    res.status(200).json({
        success:true,
        data: sponsor
    });

}); 

// @ Desc Update sponsor
// @ Route PUT /api/v1/sponsor/:id
// @ Access Private
exports.updateSponsor= asyncHandler(async(req,res,next)=>{
    
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
       });
    if(!sponsor){
      next(new ErrorResponse(`No Resource with the id ${req.params.id}`),404);
    }

    res.status(201).json({
        success:true,
        data: sponsor
    });

});

