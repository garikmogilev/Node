const {Client: rpcWSC} = require("rpc-websockets");

const ws = new rpcWSC('ws://localhost:5000/');

ws.on("open", () => {
    ws.subscribe("watchFolder").then(
        r => ws.on("watchFolder", () => console.log("watchFolder"))
    )
})