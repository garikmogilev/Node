const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");

/*************** DEFINE ***************/

const file = "static/10-01.html";
const httpPort = 3000;
const socketPort = 4000;

/*************** ERROR ***************/

const ERROR404 = (response) => {
    response.writeHead(404, 'Content-Type', 'text/html; charset=utf-8');
    response.end(`<h1> ${response.statusCode} : RESOURCE NOT FOUND </h1>`);
}

/*************** HTTP ***************/

const httpServer = http.createServer((request, response) =>
{
    if(request.method ==='GET' && request.url === "/start"){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(fs.readFileSync(file));
        response.end();
    }else {
        ERROR404(response);
    }

});

httpServer.listen(httpPort, ()=>{console.log("http://localhost:" + httpPort)});

/*************** SOCKET ***************/

new WebSocket.Server({port: socketPort, host: "localhost", path: "/wsserver"}).on("connection", (ws) => {
    let countReceive = 1, countSent = 1;

    ws.on("message", message => {
        console.log(`Received message => ${message}`);
        countReceive++;
    })

    setInterval(()=> {
        ws.send(countReceive + "->" + countSent);
        countSent++;
    }, 5000);

})