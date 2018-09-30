const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')

require('./moduls/User')
require('./moduls/ConstructionType')
require('./moduls/PropertyType')
require('./moduls/State')
require('./moduls/Offer')
require('./moduls/Neighborhood')
require('./moduls/PhoneNumber')


require('./services/passport')
const app = express()
app.use(bodyParser())
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
require('./routes/offers')(app)

if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development'){
    app.use(express.static('client/build')) 

    const path = require('path')
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('server listen on port: ' + PORT)
})
