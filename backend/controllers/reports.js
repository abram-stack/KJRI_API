const Report = require ('../models/Report')
const ErrorHandler = require('../util/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc get all the report mail (surat pengunguman)
// route GET /api/reports
// private only logged in user
exports.getReports = asyncHandler( async ( req, res, next) => {
  const reports = await Report.find();
  res.status(200).json(reports);
});


// @desc get single report 
// route GET /api/reports/:id
// private only logged in user 
exports.getReport = asyncHandler( async (req, res, next) => {
  const report = await Report.findById(req.params.id);
  if(!report){
    next(new ErrorHandler(`Report with id ${req.params.id} not found`, 404));
  }
  res.status(200).json(report);
});


// @desc create single report
// route POST /api/reports/
// private only logged in user
exports.createReport = asyncHandler( async ( req, res, next) => {
  const report = await Report.create(req.body);
  res.status(200).json(report);
});


// @desc update single report 
// route PUT /api/reports/:id
// private, and authorized only logged in user as admin
exports.updateReport = asyncHandler( async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json(report);
});

// @desc delete single report 
// route DELETE /api/reports/:id
// private and authorized only logged in user as admin
exports.deleteReport = asyncHandler( async ( req, res, next) => {
  const report = await Report.findOneAndDelete(req.params.id);
  if(!report){
    next(new ErrorHandler(`Cannot delete report, id ${req.params.id} not found`),404);
  }
  res.status(200).json(report);
});