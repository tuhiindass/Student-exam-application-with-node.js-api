const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
    seqNum:{
        type:Number
    },
    lable:{
        type:String
    },
    text:{
        type:String
    },
    markdownText:{
        type:String
    },
    imgUrl:{
        type:String
    },
    correctAnswer:{
        type:Boolean
    }


})



const QuestionSchema = new mongoose.Schema({
    topic:{
        type:String,
        require:true
    },
    ranking:{
        type:String
    },
    level:{
        type:[String],
        enum:['easy','medium','hard']

    },
    text:{
        type:String,
        unique:true

    },
    markdownText:{
        type:String

    },
    imgUrl:{
        type:String

    },
   
    options:{
        type:[optionSchema]

    },
    solution:{
        type:String

    }

});

module.exports = mongoose.model('Question',QuestionSchema);