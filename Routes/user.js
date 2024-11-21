const express = require('express');
const router = express();
const users=require('../Controllers/user');

// CREATE USER 
router.post('/register', users.registerUser);
// LOGIN USER 
router.post('/login', users.loginUser);

module.exports = router;