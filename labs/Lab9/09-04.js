let http = require("http");
let query= require('querystring');

let data = "";
let options = {
    host: "localhost",
    path: "/09-04",
    port: "3000",
    method: "post"
}

let client = http.request(options, (response) => {
    console.log("HTTP response statusCode: ", response.statusCode);
    console.log("HTTP response statusMessage: ", response.statusMessage);

    response.on('data', (chunk) => {
        data += chunk;
    })

    response.on('end', ()=>{
        console.log(data);
    })
});

client.write(JSON.stringify(
    {
        _comment: "Request. Lsb work 8 task 10",
        x:1,
        y:2,
        s:"Message",
        m:["a", "b", "c", "d", "e"],
        o:{surname:"Petrov", name:"Petr"}
    }
));
client.end();