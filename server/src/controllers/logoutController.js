const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const logoutController = async (req, res) => {
  const cookies = req.cookies;


  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.jwt;

  try {

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        res.clearCookie('jwt', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'None',
        });
        return res.sendStatus(204);
      }

      const foundUser = await User.findById(decoded.userId);

      if (foundUser) {

        foundUser.refreshToken = null;
        await foundUser.save();
      }

      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        maxAge: 0,
      });

      res.sendStatus(204);
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = logoutController;