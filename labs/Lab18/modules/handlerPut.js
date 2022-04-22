/****************** POST ******************/

let handlerPut = (params) =>{
    let body;
    switch(params.request.url) {
        case "/api/faculties":
            params.request.on('data', data => {
                body = JSON.parse(data);

                params.collections.Faculty.update(
                    {faculty_name: body.FACULTY_NAME},
                    {where: {faculty: body.FACULTY}}
                )
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

        case "/api/pulpits":
            params.request.on('data', data => {
                body = JSON.parse(data);
                params.collections.Pulpit.update(
                    {pulpit_name: body.PULPIT_NAME, faculty: body.FACULTY},
                    {where:{pulpit: body.PULPIT}}
                    )
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
                params.collections.Subject.update(
                    {faculty_name: body.SUBJECT_NAME, pulpit: body.PULPIT},
                    {where: {subject: body.SUBJECT}}
                )
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
                params.collections.Subject.update(
                    {auditorium_typename: body.AUDITORIUM_TYPENAME},
                    {where: {auditorium_type: body.AUDITORIUM_TYPE}}
                    )
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

                params.collections.Auditorium.update(
                    {auditorium_name: body.AUDITORIUM_NAME, auditorium_capacity: body.AUDITORIUM_CAPACITY},
                    {where: {auditorium: body.AUDITORIUM}})
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
module.exports = (params) => handlerPut(params);