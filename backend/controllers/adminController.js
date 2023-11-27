const Admin = require('../models/adminModels');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);

    // create a token
    const token = createToken(admin._id);

    res.status(200).json({ token, role: 0 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup Admin
const signupAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailPattern = /^[A-Za-z0-9._%+-]+@vitap\.ac\.in$/;
    // validation
    if (!email || !password) {
      res.status(400).json({ error: 'All fields are required' });
    }
    if (!emailPattern.test(email)) {
      res.status(400).json({ erro: 'Use VIT-AP University mail' });
    }

    const admin = await Admin.signup(email, password);

    // create a token
    const token = createToken(admin._id);

    res.status(200).json({ email, password: admin.password, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changepassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(404).json({ error: 'Error in hashing password:' });
    }
    const item = await Admin.findOneAndUpdate(
      { email: email },
      { password: hash }
    );
    return res.status(200).json(item);
  });
};

module.exports = { loginAdmin, signupAdmin, changepassword };
