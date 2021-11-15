const WebSocket = require("ws");
const fs = require("fs");

const client = new WebSocket("ws://localhost:4000");

client.on("open", () => {
    const duplex = WebSocket.createWebSocketStream(client, {encoding: "utf-8"});
    let file = fs.createWriteStream(`./upload/Readme${++iterator}.txt`);
    duplex.pipe(file);
})