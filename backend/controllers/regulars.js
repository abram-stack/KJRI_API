const Regular = require ('../models/Regular')
const ErrorHandler = require('../util/errorResponse')
const asyncHandler = require('../middleware/async')

//@desc Get All regular mail
//route GET /api/regular
// private  only register user
exports.getRegulars = asyncHandler(async (req, res, next) => {
  const regulars = await Regular.find();
  res.status(200).json(regulars);
});


// @desc Get single regular mail
// route GET /api/regular/:id
// private only register user
exports.getRegular = asyncHandler(async( req, res ,next) => {
  const regular = await Regular.findById(req.params.id);

  if(!regular){
    next(new ErrorHandler(`Regular mail with id ${req.params.id} not found`, 404));
  }

  res.status(200).json(regular);
});


// @desc Create regular mail
// route POST /api/regular
// private only register user
exports.createRegular = asyncHandler(async(req, res, next) => {
  const regular = await Regular.create(req.body);
  res.status(200).json(regular);
});


// @desc Update regular mail
// route PUT /api/regular/:id
// private only register user
exports.updateRegular = asyncHandler(async( req, res, next) => {
  const regular = await Regular.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!regular){
    next ( new ErrorHandler(`Regular mail with id ${req.params.id} not found`), 404);
  }

  res.status(200).json(regular);
});

// @desc Delete regular mail
// route DELETE /api/regular/:id
// private only register user 
exports.deleteRegular = asyncHandler(async( req, res, next) => {
  const regular = await Regular.findOneAndDelete(req.params.id);
  if(!regular){
    next(new ErrorHandler(`Regular mail with id ${req.params.id} not found`), 404);
  }
  res.status(200).json(regular);
});