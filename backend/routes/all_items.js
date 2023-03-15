const express = require('express');
const {
  create_AllItem,
  get_AllItem,
  get_AllItems,
  delete_AllItem,
  update_AllItem,
} = require('../controllers/All_ItemController');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all item routes
// router.use(requireAuth);

// GET all items
router.get('/', get_AllItems);

//GET a single item
router.get('/:id', get_AllItem);

// POST a new item
router.post('/', create_AllItem);

// DELETE a item
router.delete('/:id', delete_AllItem);

// UPDATE a item
router.patch('/:id', update_AllItem);

module.exports = router;
