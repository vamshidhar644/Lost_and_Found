const express = require('express');

const {
  createRequest,
  getRequests,
  getRequest,
  deleteRequest,
  updateRequest,
} = require('../controllers/requestController');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all items
router.get('/', getRequests);

//GET a single item
router.get('/:id', getRequest);

// POST a new item
router.post('/', userAuth, createRequest);

// DELETE a item
router.delete('/:id', userAuth, deleteRequest);

// UPDATE a item
router.patch('/:id', adminAuth, updateRequest);

module.exports = router;
