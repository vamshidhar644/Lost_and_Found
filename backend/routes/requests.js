const express = require('express');

const {
  createRequest,
  getRequests,
  getRequest,
  deleteRequest,
  updateRequest,
} = require('../controllers/requestController');

const router = express.Router();

// GET all items
router.get('/', getRequests);

//GET a single item
router.get('/:id', getRequest);

// POST a new item
router.post('/', createRequest);

// DELETE a item
router.delete('/:id', deleteRequest);

// UPDATE a item
router.patch('/:id', updateRequest);

module.exports = router;
