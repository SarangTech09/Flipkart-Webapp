const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();  


// Helper function to create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register new user
exports.register = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ 
        error: 'Please provide name, email and password' 
      });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    //password hash
 const encryptedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ name, email, password: encryptedPassword });
    const token = createToken(user._id);

    // Remove password from output
    // user.password = undefined;

    res.cookie("userToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
      secure: true,  
    });
    //console.log("cookies token:",token);

    res.status(201).json({ 
      status: 'success',
      data: { user, token } 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      status: 'fail',
      message: error.message 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    //console.log('Request body:', req.body); // Debug log

    // Validate request body
    // More robust body checking
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('Empty request body detected');
      return res.status(400).json({ 
        error: 'Request body is required in JSON format',
        solution: 'Ensure you have Content-Type: application/json header'
      });
    }

    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Please provide email and password' 
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email });
    // console.log('User:', user);
    
    // Check if user exists and password is correct
    if (!user   ) {
      return res.status(401).json({ 
        error: 'Incorrect email' 
      });
    }
 
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const token = createToken(user._id);
    

  res.cookie("userToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
      secure: true,  
    });
    // console.log("cookies token:",token);

    res.status(201).json({ 
      status: 'success',
      data: { user, token } 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ 
      status: 'fail',
      message: error.message 
    });
  }
};