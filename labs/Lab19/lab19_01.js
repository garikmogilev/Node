const express = require('express');
const path = require("path");
const hbs = require("hbs");
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');

const app = express();
const sequelize = new Sequelize(
    'HiringStaff',
    'skvortsoff',
    '9I50ybkubu',
    {host: 'WIN-PH09AJEC5HS', dialect: 'mssql'}
);

hbs.registerPartials(path.join(__dirname + "\\views\\partial"));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const models = require("./models/models").ORM(sequelize);

module.exports = {sequelize, models};

const cityRouter = require("./routes/CityRoute");
const jobRouter = require("./routes/JobRoute");
const regionRouter = require("./routes/RigionRoute");

const homeController = require("./controller/HomeController");

sequelize.authenticate()
    .then(() => {
        console.log(`connected!`);
    })
    .catch((e) => {
        console.log(e);
    });

/*sequelize.sync().then(result=>{
    console.log(result);
})
    .catch(err=> console.log(err));*/

app.use("/job",  jobRouter);
app.use("/city",  cityRouter);
app.use("/region",  regionRouter);
app.use("/", homeController.GetIndex);

app.listen(3000);

exports = {sequelize};