const express = require('express');
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
} = require('../controllers/ItemControllers');

const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// GET all items
router.get('/', getItems);

//GET a single item
router.get('/:id', getItem);

// POST a new item
router.post('/', adminAuth, createItem);

// DELETE a item
router.delete('/:id', deleteItem);

// UPDATE a item
router.patch('/:id', updateItem);

module.exports = router;
