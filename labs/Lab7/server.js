const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = 9000;
let responder = require('./modules/m07-01')('static');

const Error405 = (response) => {
    response.writeHead(405);
    response.end("Only method GET");
}

http.createServer(function (request, response) {
    console.log(`${request.method} ${request.url}`);

    if(request.method === 'GET'){
        responder.sender(response, request.url);
    }else {
        Error405(response);
    }

}).listen(port);

console.log(`Server listening on port ${port}`);