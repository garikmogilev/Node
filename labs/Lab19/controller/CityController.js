const main = require("../lab19_01");
const Cities = require("../lab19_01").models.Cities;
const Regions = require("../lab19_01").models.Regions;

exports.addCity = (request, response)=>{
    const body = request.body;
    Cities.create({name: body.city, region: body.region}).then(() => {
        response.redirect("/city/get")
    })
        .catch(err => console.log(err))

}

exports.getCities = async (request, response) => {
    Cities.hasOne(Regions, {foreignKey: "id", sourceKey: "region"});
    let cities_regions =  Cities.findAll({
            include: [{
                model: Regions,
                required: true,
            }]
        })
        .catch(err => console.log(err))

    let regions = Regions.findAll({raw: true})
        .catch(err => console.log(err))
    let cities = Cities.findAll({raw: true})
        .catch(err => console.log(err))

    Promise.all([cities_regions, regions, cities])
        .then(value => {
            console.log(value[1]);
            response.render("cities.hbs",{
                cities_regions: value[0],
                regions:        value[1],
                cities:         value[2]
            })
        }, reason => {
            console.log(reason)
    })
        .catch(err => console.log(err))
}

exports.delCity = (request, response) => {
    const body = request.body;
    Cities.destroy({where: {id: body.id}})
        .then(() => {response.redirect("/city/get")})
        .catch(err => console.log(err))

}
exports.updCity = (request, response) => {
    const body = request.body;
    Cities.update(
        {name: body.name},
        {where: {id: body.id}})
        .then(() => {response.redirect("/city/get")})
        .catch(err => console.log(err))

}