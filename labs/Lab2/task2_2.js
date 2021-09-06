let http = require("http");
let fs = require("fs");
const Console = require("console");

let img = "./helloWorld.png";

http.createServer(function (request, response){

    fs.stat(img, (err,stat) =>{
        if(err){
            Console.error(err.code + ": " + err.message);
            response.end(err.code + ": " + err.message);
        }else{
            fs.readFile(img, (err, data)=>{
                response.contentType = "image/png";
                response.contentLength = stat.size;
                response.end(data, "binary");
            });
        }
    })
}).listen(3000);