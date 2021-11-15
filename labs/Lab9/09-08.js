let http = require("http");
const fs = require("fs");

let data = "";
let options = {
    host: "localhost",
    path: "/09-08",
    port: "3000",
    method: "get"
}

let client = http.request(options,(response)=>
{
    console.log("StatusCode: ", response.statusCode);
    console.log("StatusMessage: ", response.statusMessage);


    response.on("data",(chunk) => {
        data += chunk;
    });

    response.on("end",() => {
        fs.writeFileSync(`./upload/image.png`, data, {encoding: "base64"})
    });

});
client.end();
