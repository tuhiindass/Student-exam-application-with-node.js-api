const http = require('http');
const { type } = require('os');
const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error');

const app = express();

app.use(express.json());


// Cookie parser
app.use(cookieParser());

//load env vars
dotenv.config({path:'./config/config.env'})

//Connect to database
connectDB(); 

//Route file
const questions = require('./routes/questions');
const users = require('./routes/users');
const results = require('./routes/results');
const auth = require('./routes/auth');


//Mount routes
app.use('/api/v1/questions',questions);
app.use('/api/v1/users',users);
app.use('/api/v1/results',results);
app.use('/api/v1/auth',auth);
app.use(errorHandler);




const PORT = process.env.PORT || 4000;
app.listen(
   PORT,
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
   );

