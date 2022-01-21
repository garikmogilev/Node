const NetSocket = require("net");

const PORT = 2000;
const HOST = "127.0.0.1";
let iterator = 0;
let client = new NetSocket.Socket();

client.connect(PORT, HOST, () => {
    console.log("connected: ", client.remoteAddress,client.remotePort);
});

setInterval(() => {
    client.write(`message: ${iterator++}`);
}, 1000);

client.on("data", (data) => {
    console.log(`data: ${data.toString()}`);
});

client.on("error", (e) => {
    console.log(`error: ${e.message}`)
});