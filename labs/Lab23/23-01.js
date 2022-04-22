const express = require('express'),
    app = express(),
    session = require('express-session'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth')
        .OAuth2Strategy,
    flash = require('connect-flash')

const host = '127.0.0.1'
const port = 3000

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

function checkAuth(req, res, next) {
        if (req.user)
            next();
        else res.redirect('/login')
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: '$secret#' }))
app.use(flash())
app.use(passport.initialize(null))
app.use(passport.session(null))

passport.use(
    new GoogleStrategy(
        {
            clientID: '288905132145-a1ria75i7170tsqecn5j429nqmqd5qlq.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL:  'http://localhost:3000/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        }
    )
)

app.get('/login', (req, res) => {
    res.sendFile(__dirname+"\\index.html")
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/login");
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
)

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/resource',
    })
)

app.get('/resource', checkAuth, (req, res, next) => {
    res.send("resource")
    next();
})

app.listen(port, host, function () {
    console.log(`Server listens ${host}:${port}`)
})