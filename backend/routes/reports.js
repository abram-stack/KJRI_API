const express = require ('express')
const router = express.Router();

const {
  getReports,
  getReport,
  createReport,
  deleteReport,
  updateReport
} = require ('../controllers/reports');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
    .get(protect,getReports)
    .post(protect,createReport);

router
  .route('/:id')
    .get(protect,getReport)
    .put(protect, authorize('admin'), updateReport)
    .delete(protect, authorize('admin'), deleteReport);

module.exports = router;