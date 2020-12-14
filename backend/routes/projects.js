const express = require('express')
const { 
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require ('../controllers/projects')

const { protect, authorize } = require('../middleware/auth')
const router = express.Router();

router
  .route('/')
    .get(protect, authorize('admin'), getProjects)
    .post(protect, authorize('admin'), createProject);

router
  .route('/:id')
    .get(protect, authorize('admin'), getProject)
    .patch(protect, authorize('admin'), updateProject)
    .delete(protect, authorize('admin'),deleteProject);

module.exports = router;