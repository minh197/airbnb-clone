var createError = require('http-errors');
var express = require('express');
var path = require('path');



const mongoose=require('mongoose')
const passport = require("passport")

const expRouter = require('./routes/experiences')


const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')
require("dotenv").config();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





mongoose.connect(process.env.DB, { 
  // some options to deal with deprecated warning, you don't have to worry about them.
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true 
  }).then(()=> console.log("connected to database"))

  app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/experiences', expRouter)


app.route("*").all(function(req,res,next){
  let error = new Error("not found")
  error.statusCode = 404
  error.status = "fail"
  next(error)
})






// error handler
app.use(function(err, req, res, next) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"
  err.message = err.message || "something wrong"
  if(err){
   res.status(err.statusCode).json({status: err.status,message: err.message, stack:error.stack })
  }
});

module.exports = app;


//ok,error,fail