const express = require('express');
const router = express.Router();
//const {infoLog} = require('../services/loggerService');

const student = require('../source/student/route/studentRoute');

router.use('/student',student)

module.exports = router;