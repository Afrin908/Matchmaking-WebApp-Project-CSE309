const Message = require('../models/Message');
const Match = require('../models/Match');

// Check if two users are matched (accepted)
const areMatched = async (userId1, userId2) => {
  const match = await Match.findOne({
    $or: [
      { sender: userId1, receiver: userId2 },
      { sender: userId2, receiver: userId1 },
    ],
    status: 'accepted',
  });
  return !!match;
};

// @route POST /api/messages/send
const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  try {
    const matched = await areMatched(req.user._id, receiverId);
    if (!matched) return res.status(403).json({ message: 'You can only message matched users' });

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });
    const populated = await message.populate('sender', 'name photo');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/messages/:userId
const getMessages = async (req, res) => {
  try {
    const matched = await areMatched(req.user._id, req.params.userId);
    if (!matched) return res.status(403).json({ message: 'Not matched with this user' });

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name photo');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };
