const fs = require("fs");
const Console = require("console");
const path = require("path");
/****************** GET ******************/

let handlerGet = (params) => {
    switch(params.request.url) {
        case "/api/faculties":
            params.pool.then(() => {
                const req = "select * from faculty;";
                params.connectionPool.request().query(req, ((err, result) => {
                    if(err)
                    {
                        params.response.end(JSON.stringify(err));
                    }
                    else
                    {
                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        params.response.end(JSON.stringify(result.recordset));
                    }
                    })
                )
            })
            break;

        case "/api/pulpits":
            params.pool.then(() => {
                const req = "select * from pulpit;";
                params.connectionPool.request().query(req, ((err, result) => {
                    if(err)
                    {
                        params.response.end(JSON.stringify(err));
                    }
                    else
                    {
                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        params.response.end(JSON.stringify(result.recordset));
                    }
                    })
                )
            })
            break;

        case "/api/subjects":
            params.pool.then(() => {
                const req = "select * from subject;";
                params.connectionPool.request().query(req, ((err, result) => {
                    if(err)
                    {
                        params.response.end(JSON.stringify(err));
                    }
                    else
                    {
                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        params.response.end(JSON.stringify(result.recordset));
                    }
                    })
                )
            })
            break;

        case "/api/auditoriumstypes":
            params.pool.then(() => {
                const req = "select * from auditorium_type;";
                params.connectionPool.request().query(req, ((err, result) => {
                    if(err)
                    {
                        params.response.end(JSON.stringify(err));
                    }
                    else
                    {
                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        params.response.end(JSON.stringify(result.recordset));
                    }
                    })
                )
            })
            break;

        case "/api/auditoriums":
            params.pool.then(() => {
                const req = "select * from auditorium;";
                params.connectionPool.request().query(req, ((err, result) => {
                    if(err)
                    {
                        params.response.end(JSON.stringify(err));
                    }
                    else
                    {
                        params.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        params.response.end(JSON.stringify(result.recordset));
                    }
                    })
                )
            })
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
            params.response.end("API not exist pathname");
    }
}

module.exports = (params) => handlerGet(params);



