//for oop based development
'use-strict'

//node_modules
const express = require('express');
const bodyParser = require('body-parser');

//initializing app
const app = express()

//midelware
const apiRouter = require('./routes/index')

// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
// Body Parser Middleware
app.use(bodyParser.json());


//route rederection
app.use('/api',apiRouter)


module.exports = app;

