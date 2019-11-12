const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth.js');
const news = require('../controllers/news');
var router = express.Router();

router.post('/create', auth.jwtVerify, news.create);
router.get('/read', news.read);
router.put('/update/:id', auth.jwtVerify, news.update);
router.delete('/delete', auth.jwtVerify, news.delete);

module.exports = router;