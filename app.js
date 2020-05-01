//for oop based development
'use-strict'

//node_modules
const express = require('express');

//initializing app
const app = express()

//midelware
const apiRouter = require('./routes/index')


app.use('/api',apiRouter)


module.exports = app;

