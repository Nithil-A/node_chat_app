// Import required packages 

const User = require('../database/schemas/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, config.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.redirect("/login");
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
  
// Login user
exports.login = async (req, res) => {
  let { email, password } = req.body;
    try {
      // Get the user from db using email
      let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        // JWT payload
        const payload = {
        user: {
            id: user.id,
            name : user.name
        },
        };
        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 3600000 });
        // set the token in cookies for further usage
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });      
        // Redirect to chat page.
        res.redirect(`/api/chat/chat`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};