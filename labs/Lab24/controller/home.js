const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const Users = require("../data/context").Users;
const {accessKey, refreshKey} = require("../security/jwtKeys");

path.pop();

exports.login = async (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.sendFile(path.join("\\") + "\\views\\index.html");
            break;
        case "POST":
            if(req.body.username && req.body.password) {
                try {
                    const user = await Users.findOne(
                        {
                            where:
                                {
                                    username: req.body.username,
                                    password: req.body.password
                                }
                        });

                    const accessToken = jwt.sign({id: user.id, username: user.username, role: user.role}, accessKey, {expiresIn: 3600});
                    const refreshToken = jwt.sign({id: user.id, username: user.username, role: user.role}, refreshKey, {expiresIn: 24 * 3600});

                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        sameSite: 'strict'
                    });
                    res.cookie('id', user.id, {
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
                catch (e) {
                    res.redirect('/login')
                }
            }
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.register = (req, res, next) => {
    switch (req.method) {
        case "GET":
            res.sendFile(path.join("\\") + "\\views\\register.html");
            break;
        case "POST":
            Users.create({username: req.body.username,  password: req.body.password, email: req.body.email, role: 'User'})
                .then(() => res.send("Registration is successful"))
                .catch(err =>  res.send(err.message));
            break;
        default:
            res.statusCode = 405;
            res.messageerror = "Method not allowed";
            res.end();
    }
}

exports.logout = (req, res) =>
{
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
};
