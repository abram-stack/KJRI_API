const ErrorResponse = require('../util/errorResponse')
const asyncHandler = require('../middleware/async')
const sendEmail = require('../util/sendEmail')
const User = require('../models/User')

// @desc Get all users
// @route GET /api/auth/users
// @access private/admin
exports.getUsers = asyncHandler(async (req, res, next)=>{
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Get single users
// @route GET /api/auth/users/:id
// @access private/admin
exports.getUser = asyncHandler(async (req, res, next)=>{
  const user = await User.findById(req.params.id);

  res.status(200).json(user);
});

// @desc create user
// @route POST /api/auth/users
// @access private/admin
exports.createUser = asyncHandler(async (req, res, next)=>{
  const user = await User.create(req.body);
    
  res.status(201).json({success: true, data: user});

});


// @desc update user
// @route PUT /api/auth/users/:id
// @access private/admin
exports.updateUser = asyncHandler(async (req, res, next)=>{
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
    
  res.status(200).json({success: true, data: user});
});



// @desc delete user
// @route DELETE /api/auth/users/:id
// @access private/admin
exports.deleteUser = asyncHandler(async (req, res, next)=>{
   await User.findByIdAndDelete(req.params.id);
    
  res.status(201).json({success: true, data: {}});

});