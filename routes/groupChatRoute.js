const express = require('express');
const router = express.Router();
const { createGroup, addMember, removeMember } = require('../controllers/chatGroupController');
const auth = require('../middleware/authMiddleware');

router.post('/create', auth, createGroup);
router.post('/add/:groupId', auth, addMember);
router.post('/remove/:groupId', auth, removeMember);

module.exports = router;
