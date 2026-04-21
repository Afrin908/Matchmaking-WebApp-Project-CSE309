const User = require('../models/User');

// @route GET /api/users/me
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/users/me
const updateMyProfile = async (req, res) => {
  try {
    const allowedFields = ['name', 'age', 'gender', 'religion', 'location',
      'maritalStatus', 'education', 'university', 'profession', 'bio', 'photo'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true, runValidators: true,
    }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/users/search?age=&gender=&religion=&location=&maritalStatus=
const searchUsers = async (req, res) => {
  try {
    const { gender, religion, location, maritalStatus, education, minAge, maxAge, name } = req.query;
    const filter = { _id: { $ne: req.user._id }, isActive: true };

    if (gender) filter.gender = gender;
    if (religion) filter.religion = { $regex: religion, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (maritalStatus) filter.maritalStatus = maritalStatus;
    if (education) filter.education = { $regex: education, $options: 'i' };
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = parseInt(minAge);
      if (maxAge) filter.age.$lte = parseInt(maxAge);
    }

    const users = await User.find(filter).select('-password -email').limit(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/users/all  (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/users/:id/suspend  (admin)
const suspendUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, { isActive: false }, { new: true }
    ).select('-password');
    res.json({ message: 'User suspended', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyProfile, updateMyProfile, getUserById, searchUsers, getAllUsers, suspendUser };
