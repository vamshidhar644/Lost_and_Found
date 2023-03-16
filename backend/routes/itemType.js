const express = require('express');
const {
  createItemType,
  getItemType,
  getItemTypes,
  deleteItemType,
  updateItemType,
} = require('../controllers/ItemTypeController');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all item routes
// router.use(requireAuth);

// GET all items
router.get('/', getItemTypes);

//GET a single item
router.get('/:id', getItemType);

// POST a new item
router.post('/', createItemType);

// DELETE a item
router.delete('/:id', deleteItemType);

// UPDATE a item
router.patch('/:id', updateItemType);

module.exports = router;
