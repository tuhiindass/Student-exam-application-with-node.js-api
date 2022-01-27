const { response } = require('express');
var express = require('express')
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())
//@desc   Register
//@route  Post /api/v1/auth/register
//@access Private

exports.register = asyncHandler(async(req,res,next)=>{
   const{name, email, password, role}=req.body;

   //Create user
   const user = await User.create({
       name,
       email,
       password,
       role
   });
   sendTokenResponse(user, 200, res);
})


//@desc   Register
//@route  Post /api/v1/auth/register
//@access Private
exports.login = asyncHandler(async(req,res,next)=>{
  const{email, password}=req.body;

 //Valid email & password
 if(!email || !password){
   return next(new ErrorResponse('Please provide an email and password',400));
 }

 //Check for user
 const user = await User.findOne({email}).select('+password');

 if(!user){
   try{
    return next(new ErrorResponse('Invalid credentials',401));
   }
   catch(err)
   {   
     return next(new ErrorResponse('Invalid credentials',401));
  }
  //return res.json({success:false,msg:'Invalid credentials'});
 }

 // Check if password matches
 const isMatch = await user.matchPassword(password);

 if (!isMatch) {
  try{
    return next(new ErrorResponse('Invalid credentials',401));
   }
   catch(err)
   {   
     return next(new ErrorResponse('Invalid credentials',401));
  }
  //return next(new ErrorResponse('Invalid credentials',401));
  // res.json({success:false,msg:'Invalid credentials'});

}
 sendTokenResponse(user, 200, res);
})


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token
  });
};
// exports.cookieCheck =async(req,res,next)=>{
//   // Cookies that have not been signed
//   console.log('Cookies: ', req.cookies)

//   // Cookies that have been signed
//   console.log('Signed Cookies: ', req.signedCookies)
// }

exports.getMe = asyncHandler(async(req,res,next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    data:user
  });
})


