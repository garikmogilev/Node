const http = require("http");
const fs = require("fs");
const data = require("./packages/db.js");
const error = require("./packages/errors.js");
const url = require("url");
const {Server: rpcWSS} = require("rpc-websockets");
const fileName = "./students.txt";
const PORT = 4000;
const HOST = "localhost";
let db = new data.DB();
let err = error.Errors;

db.on("GET",  async (request, response) =>{
    let path = url.parse(request.url).pathname;

    switch (path) {
        case "/":
            response.write(db.getAll());
            console.log("getAll");
            response.end();
        break;
            case "/backup":
                fs.readdir('./backups', (err, files) => {
                    files.forEach(o => {
                        response.write(o + "\n");
                    })
                    response.end();
                })
            console.log("backupGet");

        break;
    }

    if (/\/[0-9]/.test(path)){
        let n = path.match(/\d+/g);
        if(n !== null){
            console.log(Number.parseInt(n[0]));
            let result = db.get(Number.parseInt(n[0]));
            if(result !== null){
                response.write(result);
            }else {
                err.notExist(response);
            }
        }
        response.end();
        console.log("get");
    }

})

db.on("POST",  async (request, response) =>{
    let data;

    switch (url.parse(request.url).pathname) {
        case "/":
            request.on('data', data => {
                let result = db.insert(JSON.parse(data));
                if(result !== null){
                    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    response.write(JSON.stringify(result));
                }else {
                    err.idExist(response);
                }
            });
            break;
        case "/backup":
            db.backup();
            response.end();
            break;
    }
    request.on('end', () => response.end());

});

db.on('PUT', (request, response) => {
    console.log('update');
    request.on('data', data => {
        let result = db.update(JSON.parse(data));
        if (result !== null) {
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
            response.end(JSON.stringify(result));
        } else {
            err.notExist(response);
        }
    });
});

db.on('DELETE', (request, response) =>
{
    let path = url.parse(request.url).pathname;

    if (/\/d+/.test(path))
    {
        let n = path.match(/\d+/g);
        if (n !== null) {
            console.log(Number.parseInt(n[0]));
            let result = db.delete(Number.parseInt(n[0]));

            if (result !== null) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                response.write(JSON.stringify(result));
            } else {
                err.notExist(response);
            }
        }
    }
    else if(/\/backup\/\d+/.test(path)) {
        let flag = false;
        fs.readdir('./backups', (err, files) => {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i].match(/\d{8}/)[0]);
                console.log(Number(path.match(/\d+/)));
                if (files[i].match(/\d{8}/)[0] < Number(path.match(/\d+/))) {
                    flag = true;
                    fs.unlink(`./backups/${files[i]}`, (e) => {
                        if (e) {
                            console.log('Error');
                        } else {
                            console.log('Delete backup file: ' + files[i]);
                        }
                    });
                }
            }
            /*if (!flag) {
                response.setHeader('Content-Type', 'text/plain');
                response.end('No files');
            }*/
        });
    }

    console.log("DELETE");
    response.end();
});

const server = http.createServer((request, response) =>{
    db.emit(request.method, request, response);
}).listen(PORT, HOST, async () => {
    console.log(`http://${HOST}:${PORT}`);
    await db.init(fileName);
});

let serverRPC = new rpcWSS({port:5000, host:'localhost', path:'/'});

serverRPC.event("watchFolder");

fs.watch("./backups/",(event, dir) => {
    serverRPC.emit("watchFolder");
    console.log("event: " + event, "dir: " + dir);
})