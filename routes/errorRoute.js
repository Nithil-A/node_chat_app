const express = require('express');
const router = express.Router();
const { handleError } = require('../controllers/errorController');

router.use(handleError);

module.exports = router;
