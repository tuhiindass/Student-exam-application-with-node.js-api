const { Router } = require('express');
const express = require('express');

const{
   getUser,
   createUser,
   updateUser,

} = require('../controllers/users');

const router =express.Router();

router
   .route('/')
   .post(createUser);

router
   .route('/:id')
   .get(getUser)
   .put(updateUser);



 module.exports = router;