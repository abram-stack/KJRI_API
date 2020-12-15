const Project = require('../models/Project')
const asyncHandler = require('../middleware/async')
const errorResponse = require('../util/errorResponse');
const Employee = require('../models/Employee');


// @desc Get all projects
// route GET /api/projects/
// private and auth only tu and admin
exports.getProjects = asyncHandler( async ( req, res, next ) => {
  const projects = await Project.find();
  res.status(200).json(projects);
});


// @desc Get single project
// route GET /api/projects/:id
// private and auth only tu and admin
exports.getProject = asyncHandler( async ( req, res, next ) => {
  const project = await Project.findById(req.params.id);
  res.status(200).json(project);
});

// @desc create single project
// route POST /api/projects/
exports.createProject = asyncHandler( async ( req, res, next ) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});


// @desc update project
// route PATCH /api/projects/:id
// route PATCH /api/projects/
exports.updateProject = asyncHandler ( async ( req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
    runValidators: true
  });
  if(!project){
    return next(new errorResponse(`Project with id ${req.params.id} not found`, 404));
  }
  res.status(200).json(project);
});


// @desc delete project 
// route DELETE /api/projects/:id
exports.deleteProject = asyncHandler(async ( req, res, next ) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if(!project){
    return next(new errorResponse(`Project with id ${req.params.id} not found`, 404));
  }
  res.status(200).json(project);
});

