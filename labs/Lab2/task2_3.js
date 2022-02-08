let http = require("http");
let fs = require("fs");
const Console = require("console");

http.createServer(function (request, response){

    let path = request.url;

    response.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});

    if(path === "/api/name")
    {
        response.end("Skvortsov Igor");
    }
    else{
        response.end("url + \"/api/name\"");
        Console.log("only: localhost:3000/api/name");
    }

    if(request.method === "GET")
        switch (request.url) {
            case "/all": //endpoint
                //
                break;
            case "one":  //endpoint
                //
                break;
            case "get-group": //endpoint
                //
                break;

        }

}).listen(3000);

