const rpcWSS = require("rpc-websockets").Server;
let server = new rpcWSS({port: 4000, host: "localhost"});

server.register("A", () => console.log("Notify A"));
server.register("B", () => console.log("Notify B"));
server.register("C", () => console.log("Notify C"));