const WebSocket = require("ws");
const fs = require("fs");
let iterator = 0;

const server = new WebSocket.Server({port: 4000, host: "localhost"});
server.on("connection", (ws) => {
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: "utf-8"});
    let file = fs.createWriteStream(`./upload/file${iterator++}.txt`);
    duplex.pipe(file);
})