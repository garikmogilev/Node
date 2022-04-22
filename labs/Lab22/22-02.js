const app = require('express')();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require("express");

const redisClient = require('redis').createClient();

const accessKey = '~secret~';
const refreshKey = '@secret@';

const sequelize = new Sequelize(
    'Lab22',
    'skvortsoff',
    '9I50ybkubu',
    {host: 'WIN-PH09AJEC5HS', dialect: 'mssql'}
);

const Model = Sequelize.Model;
redisClient.connect().then(() => console.log('connect'));

class Users extends Model{}
Users.init (
    {
        id:	{type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
        login:{type: Sequelize.STRING, allowNull:false},
        password:	{type: Sequelize.STRING, allowNull:false}
    },
    {
        sequelize,
        Users:'Users',
        tableName:'Users',
        timestamps: false
    }
);

app.use(express.static("public"));
app.use(cookieParser("cookie_key"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) =>
{
    if (req.cookies.accessToken)
    {
        jwt.verify(req.cookies.accessToken, accessKey, (err, payload) =>
        {
            if (err)
            {
                next();
            }
            else if(payload)
            {
                req.payload = payload;
                next();
            }
        });
    }
    else next();
});

app.get('/login', (req, res) =>
{
    res.sendFile(__dirname + '\\index.html');
});

app.get('/register', (req, res) =>
{
    res.sendFile(__dirname + '\\register.html');
});

app.post('/register', async (req, res) =>
{
    Users.create({login: req.body.username,  password: req.body.password})
        .then(() => res.send("Registration is successful"))
        .catch(err =>  res.send(err.message));

});

app.post('/login', async (req, res) =>
{
    const candidate = await Users.findOne(
        {
            where:
                {
                    login: req.body.username,
                    password: req.body.password
                }
        });
    if (candidate)
    {
        const accessToken = jwt.sign({id: candidate.id, login: candidate.login}, accessKey, {expiresIn: 600});
        const refreshToken = jwt.sign({id: candidate.id, login: candidate.login}, refreshKey, {expiresIn: 86400});

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/refresh-token'
        });

        res.redirect('/resource');
    }
    else
    {
        res.redirect('/login');
    }
});

app.get('/refresh-token', async (req, res) =>
{
    if (req.cookies.refreshToken) {
        let isToken = await redisClient.get(req.cookies.refreshToken);
        if (isToken === null) {
            jwt.verify(req.cookies.refreshToken, refreshKey, async (err, payload) => {
                if (err)
                    res.send(err.message);
                else if (payload) {
                    await redisClient.set(req.cookies.refreshToken, "blocked");

                    const candidate = await Users.findOne({where: {id: payload.id}});
                    const newAccessToken = jwt.sign({
                        id: candidate.id,
                        login: candidate.login
                    }, accessKey, {expiresIn: 10 * 60});
                    const newRefreshToken = jwt.sign({
                        id: candidate.id,
                        login: candidate.login
                    }, refreshKey, {expiresIn: 24 * 60 * 60});

                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        sameSite: 'strict'
                    });

                    res.cookie('refreshToken', newRefreshToken, {
                        path: '/refresh-token'
                    });
                    res.redirect('/resource');
                }
            });
        }else
            res.send("Refresh token is blocked");
    }
    else res.status(401).send('To access the resource, you need to log in');
});

app.get('/resource', (req, res) =>
{
    if (req.payload)
        res.status(200).send(`Resource ${req.payload.id}-${req.payload.login}`);
    else
        res.status(401).send('To access the resource, you need to log in');
});

app.get('/logout', (req, res) =>
{
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
});

sequelize.sync().then(() =>
{
    app.listen(3000, () => console.log('Server is running on http://localhost:3000/"'));
})
    .catch(error => console.log(error));
