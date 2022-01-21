const {Client: rpcWSC} = require("rpc-websockets");

const ws = new rpcWSC('ws://localhost:4000/');
let chunk = "";

process.stdin.on("readable", () => {
    while ((chunk = process.stdin.read()) !== null){
        if(chunk != null) {
            chunk = chunk.toString().trim().toUpperCase();
            ws.notify(chunk);
        }
    }
})