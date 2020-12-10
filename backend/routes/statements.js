const express = require('express')
const { 
  getStatements,
  getStatement,
  createStatement,
  updateStatement,
  deleteStatement
 } = require ('../controllers/statements')
 const { protect, authorize } = require('../middleware/auth');
const router = express.Router()

router
 .route('/')
  .get(protect,getStatements)
  .post(protect, createStatement);

router
 .route('/:id')
  .get(protect, getStatement)
  .put(protect, authorize('admin'), updateStatement)
  .delete(protect, authorize('admin'), deleteStatement);

module.exports = router;

