const fs = require("fs");
const Console = require("console");
const path = require("path");

/** {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} **/
/****************** GET ******************/
let send = (params,values) => {
    params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    params.response.end(JSON.stringify(values));
}

let error = (params,err) => {
    params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    params.response.end(JSON.stringify(err));
}

let handlerGet = (params) => {
    let encodeUri = decodeURI(params.request.url);
    switch(encodeUri) {
        case "/api/faculties":
            params.collections.Faculty.findAll()
                .then(values => {
                    send(params, values)
            })
                .catch(err => error({error: err.message}))
            break;

        case "/api/pulpits":
            params.collections.Pulpit.findAll().then(values => {
                send(params, values)
            })
                .catch(err => error({error: err.message}))
            break;

        case "/api/subjects":
            params.collections.Subject.findAll().then(values => {
                send(params, values)
            })
                .catch(err => error({error: err.message}))
            break;

        case "/api/auditoriumstypes":
            params.collections.Auditorium_type.findAll().then(values => {
                send(params, values)
            })
                .catch(err => error({error: err.message}))
            break;

        case "/api/auditoriums":
            params.collections.Auditorium.findAll().then(values => {
                send(params, values)
            })
                .catch(err => error({error: err.message}))
            break;

        case "/api/auditoriumsgt60":
            params.collections.Auditorium.scope({method: 'auditoriumsgt60'}).findAll()
                .then(values => {
                    send(params, values)
                })
                .catch(err => error({error: err.message}))
            break;

        case "/":
            fs.access("./static/index.html", fs.constants.F_OK, (err)=> {
                if (err) {
                    console.error(err.code + err.message);
                    params.response.end(err.code + err.message);
                } else {
                    fs.createReadStream("./static/index.html").pipe( params.response);
                }
            })
            break;
        default:
            if(/\/api\/faculties\/[А-яA-z]+\/pulpits/.test(encodeUri)){
                let uri = encodeUri.toString().split("/");
                let name = uri[3];

                params.collections.Faculty.hasMany(params.collections.Pulpit, {foreignKey: "faculty", sourceKey: "faculty"});
                params.collections.Faculty.findAll({
                    where: {faculty: name},
                    include: [{
                        model: params.collections.Pulpit,
                        required: true
                    }]
                    }
                ).then(values => {
                    send(params, values)
                })
                    .catch(err => error({error: err.message}))
            } //api/faculties/xyz/teachers
            else if(/\/api\/faculties\/[А-яA-z]+\/teachers/.test(encodeUri)){
                let uri = encodeUri.toString().split("/");
                let name = uri[3];

                params.collections.Faculty.hasMany(params.collections.Pulpit, {foreignKey: "faculty", sourceKey: "faculty"});
                params.collections.Pulpit.hasMany(params.collections.Teacher, {foreignKey: "pulpit", sourceKey: "pulpit"});
                params.collections.Faculty.findAll({
                    where: {faculty: name},
                    include: [{
                        model: params.collections.Pulpit,
                        required: true,
                    include: [{
                        model: params.collections.Teacher,
                        required: true
                    }]
                    }]}
                ).then(values => {
                    send(params, values)
                })
                    .catch(err => error({error: err.message}))
            }
            else {
                params.response.end("API not exist pathname");
            }



    }
}

module.exports = (params) => handlerGet(params);



