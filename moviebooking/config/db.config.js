const mongoose = require('mongoose');

// Define your MongoDB connection URL
const dbURL = 'mongodb://127.0.0.1:27017/moviesdb';

// Connect to MongoDB
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Export the mongoose connection
module.exports = mongoose.connection;

