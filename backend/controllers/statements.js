const Statement = require('../models/Statement')
const AsyncHandler = require('../middleware/async')
const ErrorResponse = require('../util/errorResponse')

// @desc get all statements mail (surat keterangan)
// route GET /api/statements
// private only logged in user
exports.getStatements = AsyncHandler ( async ( req, res, next ) => {
  const statements = await Statement.find();

  res.status(200).json(statements);
});

// @desc get single statement mail
// route GET /api/statements/:id
// private only logged in user
exports.getStatement = AsyncHandler ( async ( req, res, next) => {
  const statement = await Statement.findById(req.params.id);
  
  if(!statement){
    return next(new ErrorResponse(`Statement mail with id ${req.params.id} not found`, 404));
  }

  res.status(200).json(statement);
});


// @desc create statement mail
// route POST /api/statements/
// private only logged in user 
exports.createStatement = AsyncHandler( async ( req, res, next) => {
  const statement = await Statement.create(req.body);
  res.status(201).json(statement);
});



// @desc update single statement mail
// route PUT /api/statements/:id
// private and authorized, only admin can update
exports.updateStatement = AsyncHandler( async ( req, res, next) => {
  const statement = await Statement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!statement){
    return next(new ErrorResponse(`Statement mail with ${req.params.id} not found`, 404));
  }

  res.status(200).json(statement);
});


// @desc delete single Statement mail
// route DELETE /api/statements/:id
// private and authorized, only admin can update
exports.deleteStatement = AsyncHandler( async (req, res, next) => {
  const statement = await Statement.findByIdAndDelete(req.params.id);

  if(!statement){
    return next( new ErrorResponse(`Statement mail with ${req.params.id} not found`, 404));
  }

  res.status(200).json(statement);
});

