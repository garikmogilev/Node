const passport = require('passport');
let createError = require('http-errors');
const app = require("express")();
const LocalStrategy = require("passport-local").Strategy;
const {credentials, verification} = require("./modules/21-01m");
const bodyParser = require('body-parser');
const express = require("express");
const session = require("express-session")(
    {
        resave: false,
        saveUninitialized: false,
        secret: "~#secret#~"
    }
);

passport.use(new LocalStrategy((user, password, done)=>{
    let rc = null;
    let cr = credentials(user);

    if(!credentials(user)) rc = done(null, false, {message: "incorrect login"});
    else if(!verification(cr.password, password)) rc = done(null, false, {message: "incorrect password"})
    else rc  = done(null, user);
    return rc;
}))

passport.serializeUser((user, done)=> {
    console.log("serialize", user);
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("deserialize", user);
    done(null, user);
})

app.use(express.static("public"));
app.use(session);
app.use(passport.initialize(null));
app.use(passport.session(null));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/login',
    function(req, res) {
        res.sendFile(__dirname+"\\index.html");
    });

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/resource');
    });

app.get('/logout', (req, res)=>
{
    req.logout();
    res.redirect('/login');
})

app.get('/resource', (req, res)=>
{
    if(req.user)
        res.end('RESOURCE');
    else
        res.redirect('/login');
});

app.get("*", (req, res, next) => {
    res.send(createError(404, 'This path does not exist!'));
});

app.listen(3000);