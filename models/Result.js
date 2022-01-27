const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
    {
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question'

        },
        answer:[String],
        correct:Boolean
    }
)

const resultSchema = new mongoose.Schema(
    {
        date:{
            type:Date,
            default:Date.now
        },
        score:{
           type: [scoreSchema]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
             ref:'User'
            
        }
    }
)

module.exports = mongoose.model('Result',resultSchema);