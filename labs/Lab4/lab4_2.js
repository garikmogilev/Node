let http        = require('http');
let url         = require('url');
let fs          = require('fs');
let data        = require('./modules/module01');
const Console   = require("console");
const page      = "./index.html";

let db = new data.DB();

// TODO listeners of events

db.on('GET', async  (request, response) =>
{
        if(typeof url.parse(request.url, true).query.id !== "undefined") {
            let id = Number.parseInt(url.parse(request.url, true).query.id);
            if (Number.isInteger(id)) {
                console.log('DB.GET ROW');
                response.end(JSON.stringify(db.select(id)));
            }
        }
        else {
            console.log('DB.GET');
            response.end(JSON.stringify(db.select(null)));
        }

});

db.on('POST', async (request, response) =>
{
    console.log('DB.POST');
    request.on('data', data => {
        db.insert(JSON.parse(data));
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        response.end(data);
    });
});

db.on('PUT', async (request, response) =>
{
    console.log('DB.PUT');
    request.on('data', data => {
        db.update(JSON.parse(data));
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        response.end(JSON.stringify(JSON.parse(data)));
    });
});

db.on('DELETE', async (request, response) =>
{
    console.log('DB.DELETE');
    if(typeof url.parse(request.url, true).query.id !== "undefined") {
        let id = Number.parseInt(url.parse(request.url, true).query.id);
        if (Number.isInteger(id)) {
            console.log('DB.DELETE');
            response.end(JSON.stringify(db.delete(id)));
        }
    }
});

let server = http.createServer(async function (request, response) {
    if(url.parse(request.url).pathname === "/" ){
        response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});

        fs.access(page, fs.constants.F_OK, (err)=> {
            if (err) {
                Console.error(err.code + err.message);
                response.end(err.code + err.message);
            } else {
                fs.createReadStream(page).pipe(response);
            }
        })

    }
    else if(url.parse(request.url).pathname === "/api/db" ){
        db.emit(request.method, request, response);
    }
}).listen(3000);

