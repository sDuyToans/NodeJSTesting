const express = require('express');
const router = express.Router();
const { renderSignup, singup} = require('../controller/signup');
router.get('/signup', renderSignup).post('/signup', singup)
module.exports = router;