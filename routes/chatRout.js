const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const auth = require('../middleware/authMiddleware');

router.post('/send', auth, sendMessage);
router.get('/:groupId', auth, getMessages);

module.exports = router;
