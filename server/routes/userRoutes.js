const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getMyProfile, updateMyProfile, getUserById,
  searchUsers, getAllUsers, suspendUser
} = require('../controllers/userController');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);
router.get('/search', protect, searchUsers);
router.get('/all', protect, adminOnly, getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id/suspend', protect, adminOnly, suspendUser);

module.exports = router;
