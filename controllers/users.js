const User = require('../models/User');


//Post the data
exports.createUser =async(req,res,next) =>{
    let user=await User.create(req.body);
    console.log('backend',user);
    res.json({
        message:"Data store successful..",
        data:user
    });
 };

 //Get the data
 exports.getUser =async(req,res,next)=>{
    try{
       const user =await User.findById(req.params.id);
       res.status(200).json({success:true,data: user})
    }catch(err){
       res.status(400).json({success:false})
 
    }
 
  };

  //Update the data
  exports.updateUser =async(req,res,next)=>{
    const user =await User.findByIdAndUpdate(req.params.id,req.body,{
       new: true,
       runValidators:true
    });
    if(!user){
       return res.status(400).json({success:false})
    }
 
     res.status(200).json({success:true,data:User});
  };