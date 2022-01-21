const {Client: rpcWSC} = require("rpc-websockets");

const ws = new rpcWSC('ws://localhost:4000/');

ws.on("open", () => {
    ws.subscribe("B");

    ws.on("B", () => console.log("Event B"));
})