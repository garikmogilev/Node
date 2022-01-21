const WebSocket = require("ws");
const fs = require("fs");

const client = new WebSocket("ws://localhost:4000");
let iterator = 0;

client.on("open", () => {
    const duplex = WebSocket.createWebSocketStream(client, {encoding: "utf-8"});
    let file = fs.createWriteStream(`./download/Readme${++iterator}.txt`);
    duplex.pipe(file);
})