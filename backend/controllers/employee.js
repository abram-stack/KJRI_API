const Employee = require ('../models/Employee')
const errorResponse = require('../util/errorResponse')
const asyncHandler = require('../middleware/async');
const Project = require('../models/Project');

// @desc  get All the employees
// route GET /api/employees/
// route GET /api/projects/:projectId/employees
// private and auth only tu admin
exports.getEmployees = asyncHandler( async ( req, res, next )=> {
  let query ;
  // scene1 : using projectid routecheck if project exists then show employees, else if other route is hit
  if(req.params.projectId){
    query = Employee.find({ projects: req.params.projectId }).populate({
      path: 'projects',
      select: 'title description'
    });
  } else{
    query = Employee.find().populate({
      path: 'projects',
      select: 'title'
    });
  }

  const employees = await query;
  res.status(200).json(employees);
});

// @desc get single employee
// route GET /api/employees/:id
// private and auth only admin
exports.getEmployee = asyncHandler( async ( req, res, next ) => {
  const employee = await Employee.findById(req.params.id);
  if(!employee){
    return next (new errorResponse(`The employee with id ${req.params.id} not found`, 404));
  }
  res.status(200).json(employee);
});

// @desc create employee 
// route POST /api/employees/
// private and auth only admin
exports.createEmployee = asyncHandler ( async ( req, res, next ) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
});



// @desc update single employee
// route PUT /api/employees/:id
// route PUT /api/projects/:projectId/:id
// private and auth only admin
exports.updateEmployee = asyncHandler ( async ( req, res, next ) => {
  let query, query2; 
  console.log(req.params.projectId);
  
  // scenario 1: if theres projectId, then push
  if(req.params.projectId){
    query = Employee.findByIdAndUpdate(
      req.params.id, 
      {$push : {projects : req.params.projectId}},
      {new: true, useFindAndModify: false}
      );
    query2 = Project.findByIdAndUpdate(
      req.params.projectId,
      { $push: {employees : req.params.id}},
      {new: true, useFindAndModify: false}
    );
  }else {
    query = Employee.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {new: true, runValidators: true}
      );
  }
  
  const employee = await query;
  const project = await query2;

  if(!employee){
    return next(new errorResponse(`The employee with id ${req.params.id} not found`, 404));
  }
  if(!project){
    return next(new errorResponse(`The project with id ${req.params.id} not found`, 404));
  }
  res.status(200).json( project);
});

// @desc delete single employee
// route DELETE /api/employees/:id
// private and auth only admin
exports.deleteEmployee = asyncHandler ( async ( req, res, next ) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if(!employee){
    return next (new errorResponse(`The employee with id ${req.params.id} not found`, 404));
  }
  res.status(200).json(employee);
});