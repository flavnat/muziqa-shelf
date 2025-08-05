const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 

const authController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized: User not found.' });
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Unauthorized: Invalid credentials.' });
    }
    const accessToken = jwt.sign(
      {
        userId: foundUser._id,
        username: foundUser.username,
        name: foundUser.name,
      },
      process.env.JWT_SECRET || '',
      { expiresIn: '3m' }
    );

    // Create Refresh Token
    const refreshToken = jwt.sign(
      { userId: foundUser._id },
      process.env.JWT_REFRESH_SECRET || '',
      { expiresIn: '1d' }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Set to true in HTTPS
      secure: false, 
      sameSite: 'None', // Use 'Lax' or 'Strict' in same-origin; 'None' for cross-origin
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });


    res.json({
      accessToken,
      user: {
        id: foundUser._id,
        name: foundUser.name,
        username: foundUser.username,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

module.exports = authController;