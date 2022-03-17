const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('cloudinary').v2;
const Story = require('../models/Story')

// @ Desc Get story
// @ Route GET /api/v1/story
// @ Access Public
exports.getStory = asyncHandler(async(req,res,next)=>{
   
    const story = await Story.find();
    res.status(200).json({
        success:true,
        count: story.length,
        data: story
    });

});

// @ Desc Add story
// @ Route POST /api/v1/story
// @ Access Private
exports.addStory = asyncHandler(async(req,res,next)=>{
  
    const story = await Story.create(req.body)
    res.status(200).json({
        success:true,
        data: story
    });

});

// @ Desc Update Story
// @ Route PUT /api/v1/story/:id
// @ Access Private
exports.updateStory = asyncHandler(async(req,res,next)=>{
    
    const story = await Story.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
       });
    if(!story){
      next(new ErrorResponse(`No Resource with the id ${req.params.id}`),404);
    }
    
    res.status(200).json({
        success:true,
        data: story
    });

});

// @ Desc Upload photo for story
// @ route PUT /api/v1/story/:id/photo
// @ Access Private
exports.storyPhotoUpload= asyncHandler(async(req,res,next)=>{
    
    const story = await Story.findById(req.params.id)
    if(!story){
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
        await Story.findByIdAndUpdate(req.params.id, { picture: result.secure_url });

        res.status(200).json({
            success:true,
            data:file.name
        });

    });
    
});