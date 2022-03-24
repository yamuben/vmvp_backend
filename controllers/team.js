const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('cloudinary').v2;
const Team = require('../models/Team');

// @ Desc Get Team 
// @ Route GET /api/v1/team
// @ Access Public
exports.getTeam = asyncHandler(async(req,res,next)=>{
   
    const team = await Team.find();
    res.status(200).json({
        success:true,
        count: team.length,
        data: team
    });

});
// @ Desc Get Team 
// @ Route GET /api/v1/team
// @ Access Public
exports.getTeamAll = asyncHandler(async(req,res,next)=>{
   
    const team = await Team.find({role:"team"});
    const board = await Team.find({role:"board"});
    res.status(200).json({
        success:true,
        countTeam: team.length,
        countBoard: board.length,
        dataTeam: team,
        dataBoard: board
    });

});

// @ Desc Add Team
// @ Route POST /api/v1/team
// @ Access Private
exports.addTeam = asyncHandler(async(req,res,next)=>{
  
    const team = await Team.create(req.body)
    res.status(200).json({
        success:true,
        data: team
    });

});

// @ Desc Update Team
// @ Route PUT /api/v1/team/:id
// @ Access Private
exports.updateTeam = asyncHandler(async(req,res,next)=>{
    
    const team = await Team.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
       });
    if(!team){
      next(new ErrorResponse(`No Resource with the id ${req.params.id}`),404);
    }
    
    res.status(200).json({
        success:true,
        data: team
    });

});

// @ Desc Upload photo for team
// @ route PUT /api/v1/team/:id/photo
// @ Access Private
exports.teamPhotoUpload= asyncHandler(async(req,res,next)=>{
    
    const team = await Team.findById(req.params.id)
    if(!team){
        return  next(new ErrorResponse(`Resource not found with id of ${req.params.id}`,404));
    } 
    
    if (!req.files){
        return  next(new ErrorResponse(`Please upload a file`,400));
    }
    
    const file = req.files.file;

    //Make sure the image is a photo
    if(!file.mimetype.startsWith('image')){
        return  next(new ErrorResponse(`Please upload an image file`,400));  
    }
    // Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD){
        return  next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD} `,400));  
    }

    cloudinary.uploader.upload(file.tempFilePath,async(err,result)=>{
        if(err){
            return  next(new ErrorResponse(`Problem with uploading the image `,500)); 
        }
        await Team.findByIdAndUpdate(req.params.id, { picture: result.secure_url });

        res.status(200).json({
            success:true,
            data:file.name
        });

    });
    
});
