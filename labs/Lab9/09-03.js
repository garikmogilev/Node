let http = require("http");
let data = "";
let options = {
    host: "localhost",
    path: "/09-03",
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
client.write(JSON.stringify({x: 1, y: 2 , s: 3}));
client.end();