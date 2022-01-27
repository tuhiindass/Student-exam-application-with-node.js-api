const Result = require('../models/Result');

//Post the data
exports.crateResult = async(req,res,next)=>{
    
    let result=await Result.create(req.body);
    console.log('backend',result);
    res.json({
        message:"Data store successful..",
        data:result
    });
 };

 //Get the data
 exports.getResult =async(req,res,next)=>{
     let query;

     if(req.params.userId){
        query = Result.find({user:req.params.userId});

     }else{
        query = Result.find().populate({
           path:'user',
           select:'name city grade phone'
        });
     }

   const result= await query;
   res.status(200).json({
      success:true,
      count:result.length,
      data: result})
 
  };
