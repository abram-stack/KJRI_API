const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../util/errorResponse')
const User = require('../models/User')


// protect routes
exports.protect = asyncHandler(async(req, res, next) => {
  // initialize token and check authorization header
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  // }else if(req.cookies.token){
  //   token = req.cookies.token;
  }

  // make sure token exists
  if(!token){
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  // verify token, by extract the payload from token {id: 1, iat: xxx}
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    // set value into req.user,  the id in the token, which the user got by logged in with credentials. (Currently logged in user)
    // in any route where we use this protect middleware, has the access of req.user 
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});


// GRANT access to specific role what passed in here is value eg (tu, admin) 
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    next(); 
  }
}