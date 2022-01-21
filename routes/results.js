const { Router } = require('express');
const express = require('express');
const {
    crateResult,
    getResult
    }=require('../controllers/results')

const router =express.Router();

router
    .route('/')
    .post(crateResult);

router
    .route('/:id')
    .get(getResult)


 module.exports = router;