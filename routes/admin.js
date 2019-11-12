const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth.js');
const admin = require('../controllers/admin');
var router = express.Router();

router.post('/login', admin.login);
router.post('/create', auth.jwtVerify, admin.create);
router.get('/read', auth.jwtVerify, admin.read);
router.put('/update/:id', auth.jwtVerify, admin.update);
router.delete('/delete', auth.jwtVerify, admin.delete);

module.exports = router;