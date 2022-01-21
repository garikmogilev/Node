const readline = require("readline");
const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({port:4000, host:'localhost', path:'/'});
let chunk = "";

server.event("A");
server.event("B");
server.event("C");

server.on("A", () => console.log("Event A"));
server.on("B", () => console.log("Event B"));
server.on("C", () => console.log("Event C"));

process.stdin.on("readable", () => {
    while ((chunk = process.stdin.read()) !== null){
        if(chunk != null) {
            chunk = chunk.toString().trim().toUpperCase();
            server.emit(chunk);
        }
    }
})