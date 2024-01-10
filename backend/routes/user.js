const express = require('express');
const router = express.Router();
const ctr = require('../controllers/userController');

// login
router.post('/login', ctr.loginUser);

// signup
router.post('/signup', ctr.signupUser);

module.exports = router;