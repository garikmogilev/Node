const url = require("url");
/****************** POST ******************/

let handlerDel = (params) =>{
    let path = url.parse(params.request.url).pathname.trim().split('/')[2];
    let xyz = decodeURI(url.parse(params.request.url).pathname.trim().split('/')[3]);

    switch(path) {
        case "faculties":
            params.collections.Faculty.destroy(
                {where: {faculty: xyz}}
            )
                .then(result => {
                    console.log(result)
                    params.response.end(JSON.stringify(result));
                })
                .catch(error => {
                    console.error(error)
                    params.response.end(JSON.stringify(error));
                })
            break;

        case "pulpits":
            params.collections.Pulpit.destroy(
                {where:{pulpit: xyz}}
            )
                .then(result => {
                    console.log(result)
                    params.response.end(JSON.stringify(result));
                })
                .catch(error => {
                    console.error(error)
                    params.response.end(JSON.stringify(error));
                })
            break;

        case "subjects":
            params.collections.Subject.destroy(
                {where: {subject:xyz}}
            )
                .then(result => {
                    console.log(result)
                    params.response.end(JSON.stringify(result));
                })
                .catch(error => {
                    console.error(error)
                    params.response.end(JSON.stringify(error));
                })
            break;

        case "auditoriumstypes":
            params.collections.Subject.destroy(
                {where: {auditorium_type: xyz}}
            )
                .then(result => {
                    console.log(result)
                    params.response.end(JSON.stringify(result));
                })
                .catch(error => {
                    console.error(error)
                    params.response.end(JSON.stringify(error));
                })
            break;

        case "auditoriums":
            params.collections.Auditorium.destroy(
                {where: {auditorium: xyz}})
                .then(result => {
                    console.log(result)
                    params.response.end(JSON.stringify(result));
                })
                .catch(error => {
                    console.error(error)
                    params.response.end(JSON.stringify(error));
                })
            break;
    }
}
module.exports = (params) => handlerDel(params);