const User = require('../models/User')
const ErrorResponse = require('../util/errorResponse')
const asyncHandler = require('../middleware/async');
const sendEmail = require('../util/sendEmail')
const crypto = require('crypto');

// @desc Register user
// @route POST /api/auth/register
// @access private 
exports.register = asyncHandler(async (req, res, next)=>{
  // when we submit, the query will goes to body
  //we destructure, we pull stuffs out { this & this } from req.body
  const { name, email, password, role} = req.body;

  // create user, and this time we pass{}, to middleware to hash, and back.
  const user = await User.create({
    name, email, role, password 
  });

  // create token, we call method, so we use object being created
  // call method sendTokenResponse
  sendTokenResponse(user, 200, res);
});




// @desc Login
// @route POST /api/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next)=>{
  // when we submit, the query will goes to body
  //we destructure, we pull stuffs out { this & this } from req.body
  const { email, password } = req.body;

  // validate email, if both are filled
  if(!email || !password){
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // check if user with particular email, exists.
  // select +password, coz User model, select false, now we want to incl it
  const user = await User.findOne({ email }).select('+password');
  if(!user){
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // check if entered password(plaintext) match with password from db
  //we call method from User model
  const isMatch = await user.matchPassword(password);
  if(!isMatch){
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // create token, we call method, so we use object being created
  // call method sendTokenResponse
  sendTokenResponse(user, 200, res);
});




// @desc Get current logged in user
// @route GET /api/auth/me
// @access private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({success: true, data: user})
});



// @desc Update user details
// @route POST /api/auth/me
// @access private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email : req.body.email
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({success: true, data: user})
});


// @desc Update password
// @route PUT /api/auth/updatepassword
// @access private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  // send current password and set new password in the body
  const user = await User.findById(req.user.id).select('+password');

  // check current password 
  if(!(await user.matchPassword(req.body.currentPassword))){
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save(); 


  sendTokenResponse(user, 200, res);
});



// @desc Forgot password
// @route POST /api/auth/forgotpassword
// @access public(?) (anyone could ask for send token to their email)
exports.forgotPassword= asyncHandler(async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});

  if(!user){
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token, send them to user, the hashed reset save to db
  const resetToken = user.getResetPasswordToken();
  await user.save({validateBeforeSave: false});
  
  // send reset URL, 
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;
  const message = `reset email, Please make a PUT request to \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({success: true, data: 'Email sent'});

  } catch (err) {
    console.log(err);
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave: false});
    return next(new ErrorResponse('Email cannot be send', 500));
  }
});


// @desc Reset password 
// @route PUT api/auth/resetpassword/:resettoken
// @access public
exports.resetPassword = asyncHandler(async (req, res, next) => {

  // get hashed token from url
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  console.log(resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now()}
  });

  if(!user){
    return next(new ErrorResponse('Invalid token', 400));
  }

  // set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // send back token, user being logged in
    sendTokenResponse(user, 200, res);
});





// method to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token first
  const token = user.getSignedJwtToken();

  // options
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    // cookie to be accessed through only clients script
    httpOnly: true
  };

  res.status(statusCode).cookie('token', token, options).json({success: true, token});
}
