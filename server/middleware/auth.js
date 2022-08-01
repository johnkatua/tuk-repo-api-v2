const jwt = require('jsonwebtoken');

exports.authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decoded.email,  userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Not authorized'
    })
  }
}

exports.isAdmin = (req, res, next) => {
  if (req.userData.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      msg: 'Only admins authorized!'
    })
  }
}