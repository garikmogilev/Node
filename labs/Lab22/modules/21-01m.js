let Users =  require("../users.json")
console.log(Users)

const credentials = (user) => {
    return Users.find(e => e.user.toUpperCase() === user.toUpperCase());
}

const verification = (pass1, pass2) => {
    return pass1 === pass2
};

module.exports = {
    credentials:credentials,
    verification: verification
};
