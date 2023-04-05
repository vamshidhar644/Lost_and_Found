const express = require('express');
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
} = require('../controllers/ItemControllers');

// const uploads = require('../middleware/imageUpload');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all item routes
// router.use(requireAuth);

// GET all items
router.get('/', getItems);

//GET a single item
router.get('/:id', getItem);

// POST a new item
router.post('/', createItem);

// DELETE a item
router.delete('/:id', deleteItem);

// UPDATE a item
router.patch('/:id', updateItem);

module.exports = router;
