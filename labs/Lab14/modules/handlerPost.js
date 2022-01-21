
/****************** POST ******************/
let handlerPost = (params) =>{
    let body;
    switch(params.request.url) {
        case "/api/faculties":
            params.pool.then(() => {
                params.request.on('data', data => {
                    body = JSON.parse(data);

                    const req = `insert into faculty values(N'${body.FACULTY}', N'${body.FACULTY_NAME}');`;
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

                    const req = `insert into pulpit values(N'${body.PULPIT}', N'${body.PULPIT_NAME}', N'${body.FACULTY}');`;
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

                    const req = `insert into subject values(N'${body.SUBJECT}', N'${body.SUBJECT_NAME}', N'${body.PULPIT}');`;
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

                    const req = `insert into auditorium_type values(N'${body.AUDITORIUM_TYPE}', N'${body.AUDITORIUM_TYPENAME}');`;
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

                    const req = `insert into auditorium values(N'${body.AUDITORIUM}', N'${body.AUDITORIUM_TYPE}', N'${body.AUDITORIUM_CAPACITY}', N'${body.AUDITORIUM_NAME}');`;
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
module.exports = (params) => handlerPost(params);