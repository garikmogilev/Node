
let http = require('http');
const Console = require("console");

http.createServer(function (request,response) {
    response.writeHead(200, {'Content-Type':'text/html; charset = utf-8'});
    response.end('<h1> Hello world</h1>\n');

}).listen(3000);

Console.log('link http://localhost:3000');