const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express()

passport.use(new GoogleStrategy())
// clientID 225854675802-jhoqja2ij7kih6iqluj034ns7rbgi9jo.apps.googleusercontent.com
// clientSecret Jjpl2uz6aRldZJgq5NTERmux
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('server listen on port: ' + 5000)
})
