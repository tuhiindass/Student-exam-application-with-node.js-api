const Question = require('../models/Question');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//Post the data
exports.createQuestion =asyncHandler(async(req,res,next)=>{
    let question=await Question.create(req.body);
    console.log('backend',question);
    res.json({
        message:"Data store successful..",
        data:question
    });
  
 });

 //Get the data
 exports.getQuestion =asyncHandler(async(req,res,next)=>{
   
   // console.log(req.query);
   // const question =await Question.find({topic:'GK'});
   const question =await Question.find(req.query);

   res
   .status(200)
   .json({success:true,count:question.length,data: question})

 
  });
  //Update the data
  exports.updateQuestion =asyncHandler(async(req,res,next)=>{
    const question =await Question.findByIdAndUpdate(req.params.id,req.body,{
       new: true,
       runValidators:true
    });
    if(!question){
       return res.status(400).json({success:false})
    }
 
     res.status(200).json({success:true,data:question});
  });

  //Delete the data
  exports.deleteQuestion =asyncHandler(async(req,res,next)=>{
     
    const question =await Question.findByIdAndDelete(req.params.id,req.body);
      
    if(!question){
       return res.status(400).json({success:false})
    }

     res.status(200).json({success:true,data:question});
  });