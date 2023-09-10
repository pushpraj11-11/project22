const mongoose = require('mongoose');
// const uuidv4 = require('uuidv4');
// const base64 = require('b2a');
const TokenGenerator = require('uuid-token-generator');
const bcrypt = require('bcrypt');
const btoa = require('btoa');

const bookingSchema = new mongoose.Schema({
  reference_number: {
    type: Number,
    required: true,
  },
  coupen_code: {
    type: Number,
    required: true,
  },
  show_id: {
    type: Number,
    required: true,
  },
  tickets: [Number],
});

const coupenSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  userId: {
    type: String, // Use String for UUID
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: ['user', 'admin'], // Define accepted roles
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  coupens: [coupenSchema],
  bookingRequests: [bookingSchema],
});

const User = mongoose.model('User', UserSchema);

const tokenGenerator = new TokenGenerator();


// Function to create and save a new user
exports.signUp = async (req, res) => {
  try {
    const { email, first_name, last_name, password, contact, role } = req.body;
  
    // const username = btoa(`${first_name}${last_name}`);
    const username = first_name+last_name
    console.log(username)
    const userId = tokenGenerator.generate(); // Generate UUID
    const accessToken = tokenGenerator.generate();
    

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    const newUser = new User({
      userId,
      email,
      first_name,
      last_name,
      username,
      contact,
      password: hashedPassword,
      role,
      isLoggedIn: false,
      accessToken,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error', error });
    }
  }
};

// Function to check login credentials and set isLoggedIn to true if valid
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // const userName = atob(username)
    const user = await User.findOne({ username });
console.log(username , user)
    if (user && (await bcrypt.compare(password, user.password))) {
      user.isLoggedIn = true;
      await user.save();
      res.status(200).json({ message: 'Login successful', accessToken: user.accessToken });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to log out a user based on their unique userId
exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ userId });

    if (user) {
      user.isLoggedIn = false;
      await user.save();
      res.status(200).json({ message: 'Logout successful' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Define your controller functions
exports.getCouponCode = (req, res) => {
 
  res.send('Coupon code retrieved successfully');
};

exports.bookShow = (req, res) => {
  
  res.send('Show booked successfully');
};
