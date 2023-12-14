const express = require('express');
const router = express.Router();
const { renderProfile,  updateProfile} = require('../controller/profile');

router.get("/", renderProfile).post("/", updateProfile);

module.exports = router;