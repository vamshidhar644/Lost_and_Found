const express = require('express');

// controller functions
const {
  loginAdmin,
  signupAdmin,
  changepassword,
} = require('../controllers/adminController');

const router = express.Router();

// login route
router.post('/login', loginAdmin);

// signup route
router.post('/signup', signupAdmin);

// change password
router.patch('/', changepassword);

module.exports = router;
