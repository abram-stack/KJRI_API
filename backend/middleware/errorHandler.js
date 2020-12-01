const ErrorResponse = require("../util/errorResponse");

const errorHandler = (err, req, res, next) => {
  // make a copy of error, coz we dont want to send separate respond in every if else stmnts
  // using spread operator
  let error = { ...err};
  error.message = err.message;

  console.log(err);
  //mongoose bad ObjectID
  if(err.name === 'CastError'){
    const message = `Resource not found ${err.value}`; 
    error = new ErrorResponse(message, 404);
  }

  // duplicate name (MongoError, code 11000)
  if(err.code === 11000){
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // validation error (validationError)
  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({success: false, error: error.message || 'server error'});
};

module.exports = errorHandler;