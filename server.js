require('dotenv').config()
// Connect to the database
require('./config/database');

const express = require('express')
const path = require('path') //comes with node.js 
const favicon = require('serve-favicon') //same spelling from npm 
const logger = require('morgan') // because there more than one logger app beside morgan
const PORT = process.env.PORT || 3001
// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server

const app = express()


// app.use(urlencoded({true})) replace by the following code to obtain req.body
app.use(express.json())// req.body
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(logger('dev')) // helps us debugged by letting us know when we make get request
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))) // will let us put parts of the path
//_dirname = current working directory 
// go to the build directory 
// go to favicon ico 
app.use(express.static(path.join(__dirname,'build')))

/*
app.use('/api', routes) <====== Finish code once you got it
*/

/* Check if token and create req.user
app.use(require('./config/checkToken'))*/


// Put API routes here, before the "catch all" route
// app.use('/api/users', require('./routes/api/users'))
app.use('/api/todos', require('./routes/api/todos'))

app.get('/api/test', (req, res) => {
    res.json({'eureka': 'you have found it'})
})
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
}) //send this file for any routes that didnt get caught by the ones above

app.listen(PORT, () => {
    console.log('I am listening')
}) // heroku or whomever choose the PORT