const { Router } = require('express');
const express = require('express');
const {protect,authorize} = require('../middleware/auth');

const{
   getQuestion,
   createQuestion,
   updateQuestion,
   deleteQuestion
} = require('../controllers/questions');

const router =express.Router();


 router
  .route('/:id')
  .put(protect,authorize('admin'),updateQuestion)
  .delete(protect,authorize('admin'),deleteQuestion);
   
  router
      .route('/')
      .post(protect,authorize('admin','publisher'),createQuestion)
      .get(protect,authorize('student'),getQuestion);


 module.exports = router;