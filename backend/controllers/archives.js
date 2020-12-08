const Archive = require('../models/Archive')
const ErrorResponse = require('../util/errorResponse')
const asyncHandler = require('../middleware/async')


// @desc Get all archives
// @route GET /api/archives
// @access private 
exports.getArchives = asyncHandler (async(req, res, next) => {
        const archives = await Archive.find();
        // res.status(200).json({data: archives});
        res.status(200).json(archives);

});

// @desc Get single archive
// @route GET /api/archives/:id
// @access private 
exports.getArchive =asyncHandler(async(req, res, next) => {
        const archive = await Archive.findById(req.params.id);
        if(!archive){
            next(new ErrorResponse(`Archive not found with id ${req.params.id}`, 404));
        }
        res.status(200).json(archive);
});

// @desc Post newarchive
// @route POST /api/archives/:id
// @access private 
exports.createArchive = asyncHandler(async(req, res, next) => {

        const archive = await Archive.create(req.body);
        res.status(200).json({ data: archive });
    
});

// @desc Update single archive
// @route PUT /api/archives/:id
// @access private 
exports.updateArchive =asyncHandler(async(req, res, next) => {
        const archive = await Archive.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!archive){
           return next(new ErrorResponse(`Archive not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({ data: archive}); 
});

// @desc Delete single archive
// @route DELETE /api/archives/:id
// @access private 
exports.deleteArchive = asyncHandler(async(req, res, next) => {
        const archive = await Archive.findByIdAndDelete(req.params.id);
        
        if(!archive){
            next(new ErrorResponse(`Archive not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({ data: []});
    
});