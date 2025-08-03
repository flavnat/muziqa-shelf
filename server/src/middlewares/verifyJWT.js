// middleware/verifyJwt.js
const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // ✅ Token is valid — attach user info to `req`
    req.userId = decoded.userId;
    req.username = decoded.username;

    // Go to next middleware or route
    next();
  });
};

module.exports = verifyJwt;