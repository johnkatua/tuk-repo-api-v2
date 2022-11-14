const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { sendEmail } = require('../../utils/sendEmail');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
};

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

exports.signup = async(req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({
      msg: 'User already exists'
    });
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, role: role || "student" });
    const accessToken = jwt.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    await newUser.save();
    res.json({
      data: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      },                                                                                                                                                                                                                                                                                                                                                                                                                          
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
    const accessToken = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: {
        id: user._id,
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

exports.getUser = async (req, res) => {
  const user = req.userData;
  try {
    if (user) {
      res.status(200).json({
        msg: 'user profile successfully fetched',
        data: user
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: 'An error occurred'
    })
  }
}

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

exports.resetPassword = async(req, res) => {
  try {
    const { email } = req.params;
    const passwordResetCode = uuid.v4();
    return res.json({
      passwordResetCode
    })
  } catch (error) {
    console.log(error)
  }
}

exports.testEmail  = async (req, res) => {
  try {
    await sendEmail({
      to: 'johnkatua99+test2@gmail.com',
      from: 'johnkatua99@gmail.com',
      subject: 'Does this work',
      text: 'Welcome again'
    });
    res.status(200).json({ msg: 'Email sent successfully '})
  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }
}