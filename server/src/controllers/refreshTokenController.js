const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const refreshTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token.' });
      }
      const foundUser = await User.findById(decoded.userId).select('+refreshToken');

      if (!foundUser || foundUser.refreshToken !== refreshToken) {
        console.log("cookies refresh", refreshToken)
        console.log("found user Token", foundUser.refreshToken)
        console.log("found user", foundUser)
        return res.status(403).json({ message: 'User not authenticated.' });
      }
      const accessToken = jwt.sign(
        {
          userId: foundUser._id,
          username: foundUser.username,
          name: foundUser.name,
        },
        process.env.JWT_SECRET || 'your-access-token-secret',
        { expiresIn: '15m' }
      );
      res.json({ accessToken });
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = refreshTokenController;