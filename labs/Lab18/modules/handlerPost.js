
/****************** POST ******************/
let handlerPost = (params) =>{
    let body;
    switch(params.request.url) {
        case "/api/faculties":
            params.request.on('data', data => {
                body = JSON.parse(data);

                params.collections.Faculty.create({faculty: body.FACULTY, faculty_name: body.FACULTY_NAME})
                    .then(result => {
                        console.log(result)
                        params.response.end(JSON.stringify(body));
                    })
                    .catch(error => {
                        console.error(error)
                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        params.response.end(JSON.stringify(error));
                    })
            })
            break;

        case "/api/pulpits":
            params.request.on('data', data => {
                body = JSON.parse(data);
                params.collections.Pulpit.create({pulpit: body.PULPIT, pulpit_name: body.PULPIT_NAME, faculty: body.FACULTY})
                    .then(result => {
                        console.log(result)
                        params.response.end(JSON.stringify(body));
                    })
                    .catch(error => {
                        console.error(error)
                        params.response.end(JSON.stringify(error));
                    })
            })
            break;

        case "/api/subjects":
            params.request.on('data', data => {
                body = JSON.parse(data);
                params.collections.Subject.create({subject: body.SUBJECT, faculty_name: body.SUBJECT_NAME, pulpit: body.PULPIT})
                    .then(result => {
                        console.log(result)
                        params.response.end(JSON.stringify(body));
                    })
                    .catch(error => {
                        console.error(error)
                        params.response.end(JSON.stringify(error));
                    })
            })
            break;

        case "/api/auditoriumstypes":
            params.request.on('data', data => {
                body = JSON.parse(data);
                params.collections.Subject.create({auditorium_type: body.AUDITORIUM_TYPE, auditorium_typename: body.AUDITORIUM_TYPENAME})
                    .then(result => {
                        console.log(result)
                        params.response.end(JSON.stringify(body));
                    })
                    .catch(error => {
                        console.error(error)
                        params.response.end(JSON.stringify(error));
                    })
            })
            break;

        case "/api/auditoriums":
            params.request.on('data', data => {
                body = JSON.parse(data);

                params.collections.Auditorium.create({auditorium: body.AUDITORIUM, auditorium_name: body.AUDITORIUM_NAME, auditorium_capacity: body.AUDITORIUM_CAPACITY})
                    .then(result => {
                        console.log(result)
                        params.response.end(JSON.stringify(body));
                    })
                    .catch(error => {
                        console.error(error)
                        params.response.end(JSON.stringify(error));
                    })
            })
            break;
    }
}
module.exports = (params) => handlerPost(params);