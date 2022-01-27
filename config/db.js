const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
    useNewUrlParser: "true",
    useUnifiedTopology: "true"
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;

// const connectDB = async()=>{
// mongoose.connect(process.env.MONGO_URL).then(function(db){
//     console.log('db connect');
// })
// .catch(function(err){
//    console.log(err);
// });
// };
// module.exports = connectDB;