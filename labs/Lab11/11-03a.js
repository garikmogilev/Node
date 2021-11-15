const WebSocket = require("ws");

const client = new WebSocket("ws://localhost:5000");

const duplex = WebSocket.createWebSocketStream(client, {encoding: "utf-8"});

duplex.pipe(process.stdout);

process.stdin.pipe(duplex);

client.on("ping", data => {
    console.log("on ping: ", data.toString());
});