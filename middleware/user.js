const mongoose = require('mongoose');
const User = require('../models/user');
const getUserById = async (req, res, next) => {
    const { user_id } = req.params;
  
    try {
      const user = await User.findOne({ user_id });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      req.user = user; 
      next()
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };

  
  const updateMiddleware = async (req, res, next) => {
    const { user_id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { user_id },
        updateData
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      let user  = await User.findOne({user_id})
      
      req.updatedUser = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {getUserById,updateMiddleware};