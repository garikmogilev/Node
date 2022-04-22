const Regions = require("../lab19_01").models.Regions;

exports.getRegions = (request, response) => {
    Regions.findAll({raw: true}).then((result) => {
        response.render("regions.hbs", {
            regions: result
        })
    })
        .catch(err => console.log(err))
}

exports.addRegion = (request, response)=>{
    const body = request.body;
    Regions.create({name: body.name, code: body.code}).then(() => {
        response.redirect("/region/get")
    })
        .catch(err => console.log(err))
}
exports.updRegion = (request, response)=>{
    const body = request.body;
    Regions.update(
        {name: body.name},
        {where: {id: body.id}})
        .then(() => {response.redirect("/region/get")})
        .catch(err => console.log(err))
}


exports.delRegion = (request, response) => {
    const body = request.body;
    Regions.destroy({where: {id: body.id}})
        .then(() => {response.redirect("/region/get")})
        .catch(err => console.log(err))
}