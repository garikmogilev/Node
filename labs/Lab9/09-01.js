let http = require("http");
let data = "";
let options = {
    host: "localhost",
    path: "/09-01",
    port: "3000",
}

http.get(options, (response) => {
    console.log("HTTP response statusCode: ", response.statusCode);
    console.log("HTTP response statusMessage: ", response.statusMessage);
    console.log("Remote IP address: ", response.socket.remoteAddress);
    console.log("Remote port: ", response.socket.remotePort);

    response.on('data', (chunk) => {
        data += chunk;
    })

    response.on('end', ()=>{
        console.log(data);
    })
});