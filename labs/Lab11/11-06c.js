const {Client: rpcWSC} = require("rpc-websockets");

const ws = new rpcWSC('ws://localhost:4000/');

ws.on("open", () => {
    ws.subscribe("C");

    ws.on("C", () => console.log("Event C"));
})