const express = require ('express');
const router = express.Router();
const { 
  getRegulars,
  updateRegular,
  createRegular,
  deleteRegular
} = require ('../controllers/regulars');

const { protect, authorize} = require ('../middleware/auth');


// router.use(protect);
// router.use(authorize('admin'));

router
  .route('/')
    .get(protect,getRegulars)
    .post(protect,createRegular);

router
  .route('/:id')
    .put(protect, authorize('admin'), updateRegular)
    .delete(protect, authorize('admin'), deleteRegular);

module.exports = router;