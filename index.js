const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./moduls/User')
require('./services/passport')
const app = express()

mongoose.connect(keys.mongoURI,()=>{
    console.log('mongo work ')
})
const cookieExpiredTime = 30 * 24 * 60 * 60 * 1000
const cookieSicret = keys.cookieKey

app.use(
    cookieSession({
        maxAge:cookieExpiredTime,
        keys: [cookieSicret]
    })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('server listen on port: ' + PORT)
})
