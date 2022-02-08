const http = require("http");
const url = require("url");
const fs = require("fs");
const Console = require("console");
const queryString = require("querystring");
const multiparty = require("multiparty");

const server = http.createServer().listen(3000);

let dirStatic = './static';
let id = 0;

const ERROR404 = (response) => {
    response.writeHead(404, 'Content-Type', 'text/html; charset=utf-8');
    response.end(`<h1> ${response.statusCode} : RESOURCE NOT FOUND </h1>`);
}

let procGet = (request, response) => {
    let x;
    let y;

    switch (url.parse(request.url).pathname) {

        case '/connection':
            if (typeof url.parse(request.url, true).query.set !== "undefined") {
                let set = Number.parseInt(url.parse(request.url, true).query.set);
                if (Number.isInteger(set)) {
                    server.keepAliveTimeout = set;
                    response.write("New value keepAliveTimeout: " + server.keepAliveTimeout);
                }
            } else {
                response.write("Current value keepAliveTimeout: " + server.keepAliveTimeout);
            }
            response.end();
            break;

        case '/headers':
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.setHeader( 'Server' , 'NodeJS');
            response.write(`<h1>request headers: ${JSON.stringify(request.headers)} </h1>`);
            response.write(`<h1>response headers: ${JSON.stringify(response.getHeaders())}<h1>`);
            response.end();
            break;

        case '/parameter':
            x = parseInt(url.parse(request.url, true).query.x);
            y = parseInt(url.parse(request.url, true).query.y);
            if(Number.isInteger(x) && Number.isInteger(y))
            {
                response.end( 'x+y='+(x+y)+
                            '\nx-y='+(x-y)+
                            '\nx*y='+(x*y)+
                            '\nx/y='+(x/y));
            }
            else
            {
                response.end('Error parameters');
            }
            break;

        case '/close':
            setTimeout(()=>  {server.close(); process.exit(0)}, 10000);

            response.end('<h1>SERVER WILL CLOSE 10 SECOND</h1>')
            break;

        case '/socket':
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write(`<h3>ServerAddress =  ${request.socket.localAddress}</h3>`);
            response.write(`<h3>ServerPort = ${request.socket.localPort}</h3>`);
            response.write(`<h3>ClientAddress = ${request.socket.remoteAddress}</h3>`);
            response.write(`<h3>ClientPort = ${request.socket.remotePort}</h3>`);
            response.end();
            break;

        case '/req-data':
            request.on('data', chunk =>
            {
                console.log(chunk);
            });

            request.on('end', () =>
            {
                console.log('request end');
            });
            response.end();
            break;

        case '/resp-status':
            let statusCode = parseInt(url.parse(request.url, true).query.code);
            let mess = url.parse(request.url, true).query.mess;

            response.statusCode = statusCode;
            response.statusMessage = mess;
            response.end(`status code: ${response.statusCode}, status message ${response.statusMessage}`);
            break;

        case '/formparameter':
            fs.access("./static/form.html", fs.constants.F_OK, (err)=> {
                if (err) {
                    Console.error(err.code + err.message);
                    response.end(err.code + err.message);
                } else {
                    let file = fs.readFileSync("./static/form.html");
                    response.end(file);
                }
            })
            break;
        case '/files':
            fs.readdir(dirStatic, (err, files) => {
                if(!err) {
                    response.setHeader('X-static-files-count', files.length);
                    response.end();
                }
                else {
                    response.end(err.message);
                }
            });
            break;
        case '/upload':
            fs.access("./static/upload.html", fs.constants.F_OK, (err)=> {
                if (err) {
                    Console.error(err.code + err.message);
                    response.end(err.code + err.message);
                } else {
                    let file = fs.readFileSync("./static/upload.html");
                    response.end(file);
                }
            })
            break;
        default:
            if(/\/parameter\/\w+\/\w+/.test(url.parse(request.url).pathname))
            {
                let chunks = url.parse(request.url).pathname.trim().split('/');
                let x = parseInt(chunks[2]);
                let y = parseInt(chunks[3]);
                if(Number.isInteger(x) && Number.isInteger(y))
                {
                    response.end
                    (   'x+y=' + (x + y)+
                        '\nx-y=' + (x - y)+
                        '\nx*y=' + (x * y)+
                        '\nx/y=' + (x / y)
                    );
                }
                else
                {
                    response.write(`URI: ${request.headers.host}${request.url}`);
                    response.end();
                }
            }
            else if(/\/files\/\w+/.test(url.parse(request.url).pathname)){
                let chunks = url.parse(request.url).pathname.trim().split('/');
                let fileName = chunks[2];
                fs.access('./static/' + fileName, fs.constants.F_OK, (err)=> {
                    if (err) {
                        Console.error(err.code + err.message);
                        ERROR404(response);
                    } else {
                        let file = fs.readFileSync('./static/' + fileName);
                        response.setHeader('Content-Type', 'application/file');
                        response.end(file);
                    }
                })
            }
            else {
                ERROR404(response);
            }
    }
}

let procPost = (request, response) => {
    let body = "";

    switch (url.parse(request.url).pathname) {

        case '/formparameter':
            request.on('data', (data) => {
                body += data;
                //Console.log(data);
            });
            request.on("end", () => {
                let query = queryString.parse(body);

                response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});

                response.write(`TEXT: ${query.text} <br>`);
                response.write(`NUMBER: ${query.number} <br>`);
                response.write(`DATE: ${query.date} <br>`);
                response.write(`CHECKBOX: ${query.checkbox} <br>`);
                response.write(`RADIOBOX: ${query.radio} <br>`);
                response.write(`TEXTAREA: ${query.textarea} <br>`);
                response.write(`SUBMIT: ${query.value} <br>`);
                response.end();
            });
            break;
        case '/json':
            request.on('data', (data) => {
                body = data;
            })
            request.on("end", () => {
                let result = JSON.parse(body);
                response.writeHead(200, {'Content-Type': 'application/json; charset = utf-8'});

                response.write(JSON.stringify(
                        {
                            "_comment": "Response. Lab work 8 task 10",
                            "x_plus_y": `${result.x + result.y}`,
                            "Concat_o_s": `${result.s} : ${result.o.surname} , ${result.o.name}`,
                            "Lenght_m": `${result.m.length}`
                        }
                    )
                );
                response.end();
            })
            break;
        case '/xml':
            request.on('data', (data) =>{
                body = data;
            })

            request.on('end', () => {
                let xml = body.toString("utf-8");
                let concat = "";
                let sum = 0;

                const xml2js = require('xml2js');
                xml2js.parseString(xml, function (err, result) {
                    console.dir(result);

                    for (let i = 0; i < result.request.m.length; i++){
                        concat += result.request.m[i].$.value;
                    }

                    for (let i = 0; i < result.request.x.length; i++){
                        sum += Number.parseInt(result.request.x[i].$.value);
                    }

                    const builder = new xml2js.Builder();
                    let xml = builder.buildObject(
                        {
                            response: {
                                '$': {id: id, request: result.request.$.id},
                                sum: {
                                    '$': {element: 'x', result: sum}
                                },
                                concat: {
                                    '$': {element: 'm', concat: concat}
                                }
                            }
                        }
                    );

                    //console.dir(xml);
                    response.writeHead(200, {'Content-Type': 'application/xml; charset = utf-8'});
                    response.end(xml);
                })
            })
            break;

        case '/upload':
            let form = new multiparty.Form({uploadDir: "./static"});

            form.on("field", (name, value) => {
                console.log(value);
            });

            form.on("file", (name, file) => {
                console.log(file.originalFilename);
            });

            form.on("error", (err) => {
                response.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
                response.end(`${err}`);
            });

            form.on("close", () => {
                response.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
                response.end("Upload file");
            });
            form.parse(request);
            break;

        default:
            ERROR404(response);
            break;
    }
}

server.on('request', (request, response) => {
    Console.log(request.method, url.parse(request.url).pathname);

    switch(request.method) {
        case "GET":
            procGet(request, response);
            break;
        case "POST":
            procPost(request, response);
            break;
    }
});

server.on('close', () => Console.log("Server close"));

server.on('connection', () =>{
    Console.log(`New connection. KeepAliveTimeout: ${server.keepAliveTimeout}`)
});
