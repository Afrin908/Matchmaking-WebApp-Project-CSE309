const Match = require('../models/Match');

// @route POST /api/match/request
const sendRequest = async (req, res) => {
  const { receiverId } = req.body;
  try {
    if (receiverId === req.user._id.toString())
      return res.status(400).json({ message: 'Cannot send request to yourself' });

    const existing = await Match.findOne({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id },
      ]
    });
    if (existing) return res.status(400).json({ message: 'Request already exists' });

    const match = await Match.create({ sender: req.user._id, receiver: receiverId });
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/match/requests  - incoming pending requests
const getIncomingRequests = async (req, res) => {
  try {
    const requests = await Match.find({ receiver: req.user._id, status: 'pending' })
      .populate('sender', 'name photo age location religion gender');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/match/sent  - requests I sent
const getSentRequests = async (req, res) => {
  try {
    const requests = await Match.find({ sender: req.user._id })
      .populate('receiver', 'name photo age location religion gender');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/match/:id/respond
const respondToRequest = async (req, res) => {
  const { status } = req.body; // 'accepted' or 'rejected'
  try {
    if (!['accepted', 'rejected'].includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const match = await Match.findOne({ _id: req.params.id, receiver: req.user._id });
    if (!match) return res.status(404).json({ message: 'Request not found' });

    match.status = status;
    await match.save();
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/match/connections  - all accepted matches
const getConnections = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
      status: 'accepted',
    })
      .populate('sender', 'name photo age location religion gender')
      .populate('receiver', 'name photo age location religion gender');

    // Return the "other" person in each match
    const connections = matches.map(m => {
      const isReceiver = m.receiver._id.toString() === req.user._id.toString();
      return {
        matchId: m._id,
        user: isReceiver ? m.sender : m.receiver,
        matchedAt: m.updatedAt,
      };
    });
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/match/:id
const deleteMatch = async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: 'Match removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendRequest, getIncomingRequests, getSentRequests, respondToRequest, getConnections, deleteMatch };
