const express = require ('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const morgan =require('morgan');
const errorHandler = require('./middleware/error')
const colors = require('colors');
const cloudinaryUpload = require('./utils/cloudinary')
const fileUpload = require('express-fileupload');

// Load env vars
dotenv.config(({path: './config/config.env'}));

//connect to Database
connectDB();

//connect to cloudinary
cloudinaryUpload();

//routes files
const sponsors = require('./router/sponsors');
//const sponsorRequest = require('./router/sponsorRequests');
const students = require('./router/students');
//const team = require('./router/team');
//const story = require('./router/story');
//const app = express();

const app = express();

//Body Parser
app.use(express.json());
// logger
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//File upload
app.use(fileUpload({
  useTempFiles:true
}));

//mount routes files
app.use('/api/v1/sponsors',sponsors);
app.use('/api/v1/students',students);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT} `.yellow.bold));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
  console.log(`Error: ${err.message}`.red);

  // close server & exit process
  server.close(()=>process.exit(1));
});