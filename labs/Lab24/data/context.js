const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const params = {
    bd: 'Lab24',
    user: "skvortsoff",
    password: "9I50ybkubu",
    server: {host: 'WIN-PH09AJEC5HS', dialect: 'mssql'}
};

const sequelize = new Sequelize(
    params.bd,
    params.user,
    params.password,
    {host: params.server.host, dialect: params.server.dialect}
);

class Users extends Model{}
class Repos extends Model{}
class Commits extends Model{}

Users.init (
    {
        id:	{type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
        username : {type: Sequelize.STRING, allowNull:false},
        email : {type: Sequelize.STRING, allowNull:false},
        password : {type: Sequelize.STRING, allowNull:false},
        role : {type: Sequelize.STRING, allowNull:false}
    },
    {
        sequelize,
        Users: 'Users',
        tableName: 'Users',
        timestamps: false
    }
);

Repos.init (
    {
        id:	{type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
        name : {type: Sequelize.STRING, allowNull:false},
        authorid : {type: Sequelize.INTEGER, allowNull:false}
    },
    {
        sequelize,
        Repos: 'Repos',
        tableName: 'Repos',
        timestamps: false
    }
);

Commits.init (
    {
        id : {type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
        message : {type: Sequelize.STRING, allowNull:false},
        repoid : {type: Sequelize.INTEGER, allowNull:false}
    },
    {
        sequelize,
        Repos: 'Commits',
        tableName: 'Commits',
        timestamps: false
    }
);
Users.hasMany(Repos, {foreignKey: 'authorid'});
Repos.belongsTo(Users, {foreignKey: 'authorid'});

Repos.hasMany(Commits, {foreignKey: 'repoid'});
Commits.belongsTo(Repos, {foreignKey: 'repoid'});

let start = setInterval(() => {connect(); console.log("try connect")}, 10000);

const connect = () =>  sequelize.sync()
    .then(() => {
        clearInterval(start);
        console.log(`Connected to ${params.server.host}`) })
    .catch(error => console.log(error));

module.exports = {Users, Repos, Commits};