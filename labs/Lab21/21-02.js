const passport = require('passport');
let createError = require('http-errors');
const app = require("express")();
const {DigestStrategy} = require("passport-http");
const {credentials} = require("./modules/21-01m");
const session = require("express-session")(
    {
        resave: false,
        saveUninitialized: false,
        secret: "~#secret#~"
    }
);

passport.use(new DigestStrategy({qop: "auth"},(user, done)=>{
    let rc = null;
    let cr = credentials(user);
    if(!cr) rc = done(null, false);
    else rc  = done(null, cr.user, cr.password);
    return rc;
},(params, done) => {
    console.log("params = ", params);
    done(null, true);
}))

passport.serializeUser((user, done)=> {
    console.log("serialize", user);
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("deserialize", user);
    done(null, user);
})

app.use(session);
app.use(passport.initialize(null));
app.use(passport.session(null));

app.get('/login', (req, res, next)=>
    {
        console.log('Login')
        if (req.session.logout && req.headers['authorization'])
        {
            req.session.logout = false;
            delete req.headers['authorization'];
        }
        next();
    },passport.authenticate('digest', {session: false}),
    (req, res) => {
        res.json(req.user);
    });

app.get('/logout', (req, res) =>
{
    req.session.logout = true;
    delete req.headers['authorization'];
    res.redirect('/login');
})

app.get('/resource', (req, res)=>
{
    if(req.session.logout === false && req.headers['authorization'])
        res.end('RESOURCE');
    else
        res.redirect('/login')
});

app.get("*", (req, res, next) => {
    res.send(createError(404, 'This path does not exist!'));
});

app.listen(3000);