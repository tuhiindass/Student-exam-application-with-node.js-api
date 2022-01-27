const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
        ],

    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
        type: String,
        enum: ['student', 'publisher','admin'],
        default: 'student',
      },
      createdAt:{
             type:Date,
             default:Date.now
        },
   

});

//Encrypt password using bcrypt
UserSchema.pre('save',async function(next){
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password,salt);
})

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User',UserSchema);



// gender:{
//     type:String,
//     require:true
// },
// grade:{
//     type:String
// },
// dob:{
//     type:Date,
//     require:true
// },
// language:{
//     type:String
// },
// city:{
//     type:String
// },
// phone:{
//     type: String,
//     maxlength: [20, 'Phone number can not be longer than 20 characters'],
// 
   
// },
// phoneVerified:{
//     type:Boolean

// },
// imgUrl:{
//     type:String
// },
// fatherName:{
//     type:String,
//     require:true
// },
// fatherPhone:{
//     type: String,
//     maxlength: [20, 'Phone number can not be longer than 20 characters']
    
// },
// fatherPhoneVerified:{
//     type:Boolean
// },
// motherName:{
//     type:String
// },
// motherPhone:{
//     type: String,
//     maxlength: [20, 'Phone number can not be longer than 20 characters']
    
    
// },
// motherPhoneVerified:{
//     type:Boolean
// },
// subscription:{
//     type:String,
//     enum:['free','paid']
// },
// modulesCompleted:{
//     type:Array
// },
// modulesVisible:{
//     type:Array
// },
// createdAt:{
//     type:Date,
//     default:Date.now
// },
// updatedAt:{
//     type:Date
// }
