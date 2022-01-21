/****************** POST ******************/

let handlerPut = (params) =>{
    let body;
    switch(params.request.url) {
        case "/api/faculties":
            params.pool.then(() => {
                params.request.on('data', data => {
                    body = JSON.parse(data);

                    const req = `update faculty set FACULTY_NAME = N'${body.FACULTY_NAME}' where FACULTY = N'${body.FACULTY}';`;
                    console.log(req);
                    params.connectionPool.request().query(req, ((err, result) => {

                            params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                            if(err)
                            {
                                params.response.end(JSON.stringify(err));
                            }
                            else
                            {
                                params.response.end(JSON.stringify(body));
                            }
                        })
                    )
                })
            })
            break;

        case "/api/pulpits":
            params.pool.then(() => {
                params.request.on('data', data => {
                    body = JSON.parse(data);

                    const req = `update pulpit set PULPIT_NAME = N'${body.PULPIT_NAME}', FACULTY = N'${body.FACULTY}' where PULPIT = N'${body.PULPIT}';`;
                    console.log(req);
                    params.connectionPool.request().query(req, ((err, result) => {

                            params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                            if(err)
                            {
                                params.response.end(JSON.stringify(err));
                            }
                            else
                            {
                                params.response.end(JSON.stringify(body));
                            }
                        })
                    )
                })
            })
            break;

        case "/api/subjects":
            params.pool.then(() => {
                params.request.on('data', data => {
                    body = JSON.parse(data);

                    const req = `update subject set SUBJECT_NAME = N'${body.SUBJECT_NAME}', PULPIT = N'${body.PULPIT}' where SUBJECT = N'${body.SUBJECT}';`;
                    console.log(req);

                    params.connectionPool.request().query(req, ((err, result) => {

                            params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                            if(err)
                            {
                                params.response.end(JSON.stringify(err));
                            }
                            else
                            {
                                params.response.end(JSON.stringify(body));
                            }
                        })
                    )
                })
            })
            break;

        case "/api/auditoriumstypes":
            params.pool.then(() => {
                params.request.on('data', data => {
                    body = JSON.parse(data);

                    const req = `update auditorium_type set AUDITORIUM_TYPENAME = N'${body.AUDITORIUM_TYPENAME}' 
                                 where AUDITORIUM_TYPE = N'${body.AUDITORIUM_TYPE}';`;
                    console.log(req);
                    params.connectionPool.request().query(req, ((err, result) => {

                            params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                            if(err)
                            {
                                params.response.end(JSON.stringify(err));
                            }
                            else
                            {
                                params.response.end(JSON.stringify(body));
                            }
                        })
                    )
                })
            })
            break;

        case "/api/auditoriums":
            params.pool.then(() => {
                params.request.on('data', data => {
                    body = JSON.parse(data);

                    const req = `update auditorium set AUDITORIUM_TYPE = N'${body.AUDITORIUM_TYPE}', 
                                    AUDITORIUM_CAPACITY = N'${body.AUDITORIUM_CAPACITY}', 
                                    AUDITORIUM_NAME = N'${body.AUDITORIUM_NAME}' where AUDITORIUM = N'${body.AUDITORIUM}';`;
                    console.log(req);
                    params.connectionPool.request().query(req, ((err, result) => {

                            params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                            if(err)
                            {
                                params.response.end(JSON.stringify(err));
                            }
                            else
                            {
                                params.response.end(JSON.stringify(body));
                            }
                        })
                    )
                })
            })
            break;
    }
}
module.exports = (params) => handlerPut(params);