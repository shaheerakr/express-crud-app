const express = require('express');
const router = express.Router();
const cors = require('cors');


const StudentControler = require('../controller/studentController');
const studentController = new StudentControler();

router.options('/getStudent',cors());
router.options('/addStudent',cors());

router.get('/getStudent',cors(),studentController.getStudent.bind(studentController));
router.post('/addStudent',cors(),studentController.addStudent.bind(studentController));


module.exports = router;