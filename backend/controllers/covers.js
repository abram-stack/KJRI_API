const Cover = require('../models/Cover')
const asyncHandler = require('../middleware/async')
const errorResponse = require('../util/errorResponse');

// @desc Get All the cover mails from database
// route GET/api/covers
// private only logged in user
exports.getCovers = asyncHandler( async (req, res, next) => {
  const covers = await Cover.find();
  res.status(200).json(covers);
});


// @desc Get single cover mail from database
// route GET/api/covers/:id
// private only logged in user
exports.getCover = asyncHandler( async( req, res, next) => {
  const cover = await Cover.findById(req.params.id);
  if(!cover){
    return next(new errorResponse(`Cover mail with id ${req.params.id} not found`), 404);
  }
  res.status(200).json(cover);
});


// @desc create cover mail save into database
// route POST /api/covers/:id
// private only logged in user
exports.createCover = asyncHandler( async ( req, res, next) => {
  const cover = await Cover.create(req.body);
  // const { archive, place, createdAtMo, createdAtYea} = cover;
  // console.log(cover);
  res.status(200).json(cover);
})


// @desc update cover mail from database
// route PUT/api/covers/:id
// private only logged in user
exports.updateCover = asyncHandler( async( req, res, next) => {
  const cover = await Cover.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }); 

  if(!cover){
    return next(new errorResponse(`Cover mail with id ${req.params.id} not found`), 404);
  }
  res.status(200).json(cover);
});


// @desc delete cover mail from database 
// route DELETE /api/covers/:id
// private only logged in user 
exports.deleteCover = asyncHandler( async( req, res, next) => {
  const cover = await Cover.findByIdAndDelete(req.params.id);

  if(!cover){
    return next(new errorResponse(`Cover mail with id ${req.params.id} not found`), 404);
  }

  res.status(200).json({data: {} });
});