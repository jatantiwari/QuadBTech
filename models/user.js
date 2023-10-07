const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: () => require('uuid').v4(),
    unique: true,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    unique: true,
    required: true
  },
  user_password: {
    type: String,
    required: true
  },
  user_image: {
    type: Buffer, // Store the image as binary data
    contentType: String // Store the image content type (e.g., 'image/png')
  },
  total_orders: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_logged_in: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;