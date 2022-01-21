const {Client: rpcWSC} = require("rpc-websockets");

const ws = new rpcWSC('ws://localhost:4000/');

ws.on("open", () => {
    ws.subscribe("A").then(r => console.log("subscribe A"));

    ws.on("A", () => console.log("Event A"));
})