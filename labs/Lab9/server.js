let http = require("http");
let url = require("url")

let server = http.createServer().listen(3000);

let processGet = (request, response) => {
    switch (url.parse(request.url).pathname){
        case '/09-01':
            response.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            response.write("Response by server to request 09-01");
            response.end();
            break;
        case '/09-02':
            response.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});

            let params = url.parse(request.url, true).query;
            let x = Number.parseInt(params.x);
            let y = Number.parseInt(params.y);
            if(Number.isInteger(x) && Number.isInteger(y)){
                response.end(`${x} + ${y} = ${x + y}`);
            }

    }
}

let processPost= (request, response) => {
    let data = "";

    switch (url.parse(request.url).pathname) {
        case '/09-03':
            request.on('data', chunk =>
            {
               data += chunk.toString();
            });

            request.on('end', () =>
            {
                let obj = JSON.parse(data);

                response.end(`${obj.x} + ${obj.y} * ${obj.s} = ${obj.x + obj.y * obj.s}`)
            });
            break;
    }
}

server.on('request', (request, response) => {
    switch (request.method){
        case 'GET':
            processGet(request, response);
            break;
        case 'POST':
            processPost(request, response);
            break;
    }
})