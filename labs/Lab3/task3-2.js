
let http = require("http");
let url = require("url");

http.createServer(function (request, response){

    if(url.parse(request.url).pathname === "/fact"){
        if(typeof url.parse(request.url, true).query.k !== "undefined") {
            let k = Number.parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)) {
                if(k > 170){
                    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
                    response.end("The program cannot calculate a factorial greater than 170");
                }else {
                    response.writeHead(200, {'Content-Type': 'application/json; charset = utf-8'});
                    response.end(JSON.stringify({k:k, fact:factorial(k) }))
                }
            }
        }
    }
}).listen(3000);

let factorial = (value) => {
    if(value === 0){
        return 1;
    }else {
        return  value * (factorial(value - 1))
    }
}
