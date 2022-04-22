const main = require("../lab19_01");
const Cities = require("../lab19_01").models.Cities;
const Users = require("../lab19_01").models.Users;
const Jobs = require("../lab19_01").models.Jobs;
const Specialization = require("../lab19_01").models.Specializations;

exports.getJob = (request, response)=>{
    let dataSet = main.sequelize.query(
        'select J.id, J.name as job, J.description, J.salary, J.date_published, C.name as city, S.name as specialization, U.login from JOBS J\n' +
        '    inner join CITIES C on C.id = J.city\n' +
        '    inner join SPECIALIZATIONS S on S.id = J.specialization\n' +
        '    inner join USERS U on U.id = J.user_id\n',
        { type: main.sequelize.QueryTypes.SELECT}
    )
        .catch(err => console.log(err))

    let cities = Cities.findAll({raw: true})
        .catch(err => console.log(err))
    let users = Users.findAll({raw: true})
        .catch(err => console.log(err))
    let specialization = Specialization.findAll({raw: true})
        .catch(err => console.log(err))

    Promise.all([dataSet, cities, users, specialization])
        .then(result => {
        response.render("index.hbs", {
            result: result[0],
            cities: result[1],
            users: result[2],
            specializations: result[3]
            })
        })
        .catch(err => console.log(err))
}

exports.addJob = (request, response)=>{
    console.log(new Date())
    const body = request.body;
    Jobs.create({user_id: body.user, name: body.job, city: body.city, description: body.description,
        specialization: body.specialization, salary: body.salary, date_published: new Date()}).then(() => {
        response.redirect("/job/get")
    })
        .catch(err => console.log(err))

}

exports.updJob = (request, response) => {
    const body = request.body;
    Jobs.update(
        {description: body.description},
        {where: {id: body.id}})
        .then(() => {response.redirect("/job/get")})
}

exports.delJob = (request, response) => {
    const body = request.body;
    Jobs.destroy({where: {id: body.id}})
        .then(() => {response.redirect("/job/get")})
}
