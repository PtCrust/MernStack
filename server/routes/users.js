const express = require('express');
const { loginUser, signUpUser } = require('../controllers/usersController');

const router = express.Router();

// Login routes
router.post('/login', loginUser);

// Sign Up routes
router.post('/signup', signUpUser);

module.exports = router;