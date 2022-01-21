const url = require("url");
/****************** POST ******************/

let handlerDel = (params) =>{
    let path = url.parse(params.request.url).pathname.trim().split('/')[2];
    let xyz = decodeURI(url.parse(params.request.url).pathname.trim().split('/')[3]);
    let found;

    params.pool.then(() => {

        const req = `select * from pulpit where PULPIT = N'${xyz}';`;
        console.log(req);
        params.connectionPool.request().query(req, ((err, result) => {
                    found = result.recordset;
            })
        )
    })

    switch (path)
    {
        case "faculties":
            params.pool.then(() => {

                const req = `delete from faculty where FACULTY = N'${xyz}';`;
                console.log(req);
                params.connectionPool.request().query(req, ((err, result) => {

                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                        if (err) {
                            params.response.end(JSON.stringify(err));
                        } else {
                            params.response.end(xyz);
                        }
                    })
                )
            })
            break;

        case "pulpits":
            params.pool.then(() => {

                const req = `delete from pulpit where PULPIT = N'${xyz}';`;
                console.log(req);
                params.connectionPool.request().query(req, ((err, result) => {

                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        if (err) {
                            params.response.end(JSON.stringify(err));
                        }
                        else {
                            if(found !== undefined)
                                params.response.end(JSON.stringify(found));
                            else
                                params.response.end(JSON.stringify(result));
                        }
                    })
                )
            })
            break;
        case "subjects":
            params.pool.then(() => {

                const req = `delete from subject where SUBJECT = N'${xyz}';`;
                console.log(req);

                params.connectionPool.request().query(req, ((err, result) => {

                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                        if (err) {
                            params.response.end(JSON.stringify(err));
                        } else {
                            params.response.end(JSON.stringify(found));
                        }
                    })
                )
            })
            break;
        case "auditoriumstypes":
            params.pool.then(() => {

                const req = `delete from auditorium_type where AUDITORIUM_TYPE = N'${xyz}';`;
                console.log(req);
                params.connectionPool.request().query(req, ((err, result) => {

                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                        if (err) {
                            params.response.end(JSON.stringify(err));
                        } else {
                            params.response.end(JSON.stringify(found));
                        }
                    })
                )
            })
            break;
        case "auditoriums":
            params.pool.then(() => {

                const req = `delete from auditorium  where AUDITORIUM = N'${xyz}';`;

                console.log(req);
                params.connectionPool.request().query(req, ((err, result) => {

                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

                        if (err) {
                            params.response.end(JSON.stringify(err));
                        } else {
                            params.response.end(JSON.stringify(found));
                        }
                    })
                )
            })
            break;
    }
}
module.exports = (params) => handlerDel(params);