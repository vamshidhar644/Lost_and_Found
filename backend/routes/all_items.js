const express = require('express');
const {
  create_AllItem,
  get_AllItem,
  get_AllItems,
  delete_AllItem,
  update_AllItem,
} = require('../controllers/All_ItemController');

const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// GET all items
router.get('/', adminAuth, get_AllItems);

//GET a single item
router.get('/:id', adminAuth, get_AllItem);

// POST a new item
router.post('/', adminAuth, create_AllItem);

// DELETE a item
router.delete('/:id', adminAuth, delete_AllItem);

// UPDATE a item
router.patch('/:id', adminAuth, update_AllItem);

module.exports = router;
