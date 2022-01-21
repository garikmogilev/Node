const NetSocket = require("net");
const {argv} = require("process");

const PORT = argv[2] ? argv[2] : 2000;
const HOST = "127.0.0.1";
let client = new NetSocket.Socket();
let buffer = new Buffer.allocUnsafe(4);

client.connect(PORT, HOST, () => {
    console.log("connected: ", client.remoteAddress,client.remotePort);
});

setInterval(() => {
    client.write((buffer.writeInt32LE(PORT, 0), buffer));
}, 1000);

client.on("data", (data) => {
    console.log(`data: ${data.toString()}`);
});

client.on("error", (e) => {
    console.log(`error: ${e.message}`)
});