let http = require("http");
let url = require("url");
const fs = require("fs");
const Console = require("console");
const page = "./index.html";
let time;

http.createServer(function (request, response){

    if(url.parse(request.url).pathname === "/" || url.parse(request.url).pathname === ""){
        response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
        fs.access(page, fs.constants.F_OK, (err)=> {
            if (err) {
                Console.error(err.code + err.message);
                response.end(err.code + err.message);
            } else {
                time = Date.now();
                let file = fs.readFileSync(page);
                response.end(file);
            }
        })
    }

    if(url.parse(request.url).pathname === "/fact"){
        if(typeof url.parse(request.url, true).query.k !== "undefined") {
            let k = Number.parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)) {
                if(k > 170){
                    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
                    response.end("The program cannot calculate a factorial greater than 170");
                }else {
                    response.writeHead(200, {'Content-Type': 'application/json; charset = utf-8'});
                    setImmediate(()=>getFactorial(k, response));
                }
            }
        }
    }
}).listen(3000);

let getFactorial = (k, response) =>
{
    let factorial = (value) => {
        if (value === 0) {
            return 1;
        } else {
            return value * (factorial(value - 1))
        }
    }
    response.end(k + ". Result: " +  (Date.now() - time) + "-" + k + "/" + factorial(k));
}
