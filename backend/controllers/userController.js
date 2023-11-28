const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    const user = new User({ email, regNo: password });

    // create a token
    const token = createToken(user._id);

    if (existingUser) {
      return res.status(200).json({ email, token, role: 1 });
    }

    await user.save();

    res.status(201).json({ email, token, role: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// // signup User
// const signupUser = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const emailPattern = /^[A-Za-z0-9._%+-]+@vitap\.ac\.in$/;
//     // validation
//     if (!email) {
//       res.status(400).json({ error: 'All fields are required' });
//     }
//     if (!emailPattern.test(email)) {
//       res.status(400).json({ erro: 'Use VIT-AP University mail' });
//     }

//     const user = await User.signup(email);

//     // create a token
//     const token = createToken(user._id);

//     res.status(200).json({ email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = { loginUser };
