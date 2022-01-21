const NetSocket = require("net");

const PORT = 2000;
const HOST = "127.0.0.1";
let client = new NetSocket.Socket();
let buffer = new Buffer.allocUnsafe(4);

client.connect(PORT, HOST, () => {
    console.log("connected: ", client.remoteAddress,client.remotePort);
});

setInterval(() => {

    client.write((buffer.writeInt32LE(Math.floor(Math.random()*1001), 0), buffer));
        }, 1000);

client.on("data", (data) => {
    console.log(`data: ${data.readInt32LE()}`);
});

client.on("error", (e) => {
    console.log(`error: ${e.message}`)
});