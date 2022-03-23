const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Student = require('../models/Student')
const Sponsor = require('../models/Sponsor')
const cloudinary = require('cloudinary').v2

// @ Desc Get students
// @ Route GET /api/v1/students
// @ Access Public
exports.getStudents = asyncHandler(async(req,res,next)=>{
   
    const students = await Student.find();
    res.status(200).json({
        success:true,
        count: students.length,
        data: students
    });

});

// @ Desc Add student
// @ Route POST /api/v1/students
// @ Access Private
exports.addStudent = asyncHandler(async(req,res,next)=>{
  
    const students = await Student.create(req.body)
    res.status(200).json({
        success:true,
        data: students
    });

});

// @ Desc Update student
// @ Route PUT /api/v1/students/:id
// @ Access Private
exports.updateStudent = asyncHandler(async(req,res,next)=>{
    
    const students = await Student.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
       });
    if(!students){
      next(new ErrorResponse(`No Resource with the id ${req.params.id}`),404);
    }
    
    res.status(200).json({
        success:true,
        data: students
    });

});

// @ Desc Upload photo for student
// @ route PUT /api/v1/students/:id/photo
// @ Access Private
exports.studentPhotoUpload= asyncHandler(async(req,res,next)=>{
    
    // const student = await Student.findById(req.params.id)
    // if(!student){
    //     return  next(new ErrorResponse(`Student not found with id of ${req.params.id}`,404));
    // } 
    
    if (!req.files){
        return  next(new ErrorResponse(`Please upload a file`,400));
    }
    
    const file = req.files.files;

    // console.log("@@@@@@@",req.files)
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
        // await Student.findByIdAndUpdate(req.params.id, { picture: result.secure_url });

        res.status(200).json({
            success:true,
            // data:file.name
            secure_url:result.secure_url
        });

    });
    
});