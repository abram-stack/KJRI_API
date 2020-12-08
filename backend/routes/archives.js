const express = require('express');
const { 
  getArchives,
  getArchive,
  createArchive, 
  updateArchive, 
  deleteArchive} = require('../controllers/archives');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getArchives)
  .post(protect,authorize('admin', 'tu'), createArchive);

router
  .route('/:id')
  .get(getArchive)
  .put(protect, authorize('admin', 'tu'),updateArchive)
  .delete(protect,authorize('admin', 'tu'), deleteArchive);

module.exports = router;