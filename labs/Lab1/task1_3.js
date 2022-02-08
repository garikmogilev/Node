let http = require('http');
const Console = require("console");

http.createServer(function (request,response) {
    let body = '';

    request.on('data', (str) => {
        body += str;
        console.log('data', body);
    });

    response.writeHead(200, {'Content-Type':'text/html; charset = utf-8'});
    request.on("end", () =>
        response.end(
        '<doctype html> ' +
        '<head>' +
        '<title>Task3</title>' +
        '</head>' +
        '<body>' +
        '<h1>Request</h1>' +
        '<h3>method: ' + request.method + '</h3>' +
        '<h3>uri: ' + request.url + '</h3>' +
        '<h3>version: ' + request.httpVersion + '</h3><br>' +
        '<h2> -- HEADERS --</h2>' +
        getParametres(request) +
        '<h2>Body</h2>' +
        '<p>' + body + '</p>' +
        '</body>' +
        '</html>'
    ));
}).listen(3000);

let getParametres = (request)=> {
    let headers = '';
    for(let key in request.headers)
        headers += '<h3>' + key + ': ' + request.headers[key] + '</h3>';
    return headers;
}

Console.log('link http://localhost:3000');