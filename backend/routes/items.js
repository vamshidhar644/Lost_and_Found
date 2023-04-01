const express = require('express');
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
} = require('../controllers/ItemControllers');
const multer = require('multer');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all item routes
// router.use(requireAuth);

// GET all items
router.get('/', getItems);

//GET a single item
router.get('/:id', getItem);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

// POST a new item
router.post('/', uploads.single('testImage'), createItem);

// DELETE a item
router.delete('/:id', deleteItem);

// UPDATE a item
router.patch('/:id', updateItem);

module.exports = router;
