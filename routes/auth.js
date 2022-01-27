const { Router } = require('express');
const express = require('express');
const {protect} = require('../middleware/auth');

const{
   register,
   login,
   cookieCheck,
   getMe
} = require('../controllers/auth');

const router =express.Router();

router.post('/register',register);
router.post('/login',login);
// router.get('/cookieCheck',cookieCheck);
router.get('/me',protect,getMe);

  

 module.exports = router;