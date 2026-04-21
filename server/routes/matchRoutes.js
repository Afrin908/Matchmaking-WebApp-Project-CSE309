const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  sendRequest, getIncomingRequests, getSentRequests,
  respondToRequest, getConnections, deleteMatch
} = require('../controllers/matchController');

router.post('/request', protect, sendRequest);
router.get('/requests', protect, getIncomingRequests);
router.get('/sent', protect, getSentRequests);
router.get('/connections', protect, getConnections);
router.put('/:id/respond', protect, respondToRequest);
router.delete('/:id', protect, deleteMatch);

module.exports = router;
