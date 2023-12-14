const express = require('express');
const router = express.Router();
const { renderLogin, login} = require('../controller/login');
router.get('/login', renderLogin).post("/login", login);
module.exports = router;