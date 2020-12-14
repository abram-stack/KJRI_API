const express = require ('express')
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require ('../controllers/employee')
const {protect, authorize } = require ('../middleware/auth')

// we merge url params
const router = express.Router({mergeParams : true});

router
  .route('/')
  .get(protect,authorize('admin'),getEmployees)
  .post(protect, authorize('admin'),createEmployee);

router
  .route('/:id')
  .get(protect, authorize('admin'),getEmployee)
  .put(protect, authorize('admin'),updateEmployee)
  .delete(protect, authorize('admin'),deleteEmployee);

module.exports = router;
