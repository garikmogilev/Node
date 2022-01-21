const WebSocket = require("ws");

let socketserver;
let countSentMessage = 1;

socketserver = new WebSocket.Server({port: 5000, host: "localhost"});

socketserver.on("connection", (ws) => {
   console.log("new connection");


   ws.on("pong", (data) => {
       console.log("on pong: ", data.toString());
   })

    ws.on("message", (data) => {
        console.log("on message: ", data.toString());
        ws.send(data);
    })

    setInterval(() => {
        console.log(`11-03-server: ${countSentMessage} number clients: ${socketserver.clients.size}`);
        ws.ping(`11-03-server: ${countSentMessage++}`);
    }, 15000);

});