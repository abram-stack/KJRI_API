const express = require ('express');
const { updateArchive } = require('../controllers/archives');
const router = express.Router()
const {
  getCovers,
  getCover,
  updateCover,
  createCover,
  deleteCover
 }  = require ('../controllers/covers')

const { protect, authorize } = require('../middleware/auth')

router
 .route('/')
  .get(protect, getCovers)
  .post(protect, createCover);

router
 .route('/:id')
  .get(protect, getCover)
  .put(protect, authorize('admin'), updateCover)
  .delete(protect, authorize('admin'), deleteCover);

module.exports = router;