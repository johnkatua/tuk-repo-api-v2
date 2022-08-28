const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
};

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

exports.signup = async(req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({
      msg: 'User already exists'
    });
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword, role: role || "student" });
    const accessToken = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
      data: newUser,
      accessToken
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message || 'An error occurred'
    })
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({
      msg: 'User does not exist'
    });
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return res.status(400).json({
      msg: 'Password is not correct'
    });
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: {
        email: user.email,
        role: user.role
      },
      accessToken
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message || 'An error occurred'
    });
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    data: users
  });
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      msg: 'User has been deleted'
    })
  } catch (error) {
    next(error);
  }
};