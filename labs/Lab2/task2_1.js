let http = require("http");
let fs = require("fs");
const Console = require("console");

let page = "./index.html";

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});

    fs.access(page, fs.constants.F_OK, (err)=>{
        if(err){
            Console.error(err.code + err.message);
            response.end(err.code + err.message);
        }else {
            let file = fs.readFileSync(page);
            response.end(file);
        }
    });

}).listen(3000);

Console.log('link: http://localhost:3000');