let http        = require('http');
let url         = require('url');
let fs          = require('fs');
let data        = require('../Lab4/modules/module01');
const Console   = require("console");
let manager     = require("./mudules/manager");
const page      = "./index.html";
let command = null;
let db = new data.DB();

// TODO listeners of events

db.on('GET',  (request, response) =>
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
    manager.incRequest();
});

db.on('POST', (request, response) =>
{
    console.log('DB.POST');
    request.on('data', data => {
        db.insert(JSON.parse(data));
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        response.end(data);
    });
    manager.incRequest();
});

db.on('PUT', (request, response) =>
{
    console.log('DB.PUT');
    request.on('data', data => {
        db.update(JSON.parse(data));
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        response.end(JSON.stringify(JSON.parse(data)));
    });
    manager.incRequest();
});

db.on('DELETE', (request, response) =>
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

db.on('COMMIT', (request, response) =>
{
    console.log('DB.COMMIT');
    db.commit(manager);

});

let server = http.createServer(function (request, response) {
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
    else  if(url.parse(request.url).pathname === "/api/ss" ) {
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        response.end(JSON.stringify(manager.getStatistics()));
    }
}).listen(3000);

process.stdin.setEncoding("utf-8");
process.stdin.on("readable", () => {

    let params = "";
    while ((command = process.stdin.read())  !== null) {

        if (command != null) {
            command = command.trim();
            params = command.split(" ", 2)
        }

        let cmd = params[0];
        let time = Number.parseInt(params[1]);

        switch (cmd){
            case "sd":
                manager.scheduledStopServer(time, server);
                break;
            case "sc":
                manager.periodicCommit(time);
                break;
            case "ss":
                manager.collectingStatistics(time);
                break;
            default:
                Console.log("Error cmd");
        }
    }
});



