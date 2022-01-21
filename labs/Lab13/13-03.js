const NetSocket = require("net");
const PORT = 2000;
const HOST = "localhost";
let sum = 0;
let buffer = Buffer.allocUnsafe(4);

const server = new NetSocket.createServer(socket => {
    console.log(`Server listen port ${PORT}, HOST ${HOST}`);

    socket.on("data", (data) => {
        sum += data.readInt32LE();
        console.log(`data: ${sum}`);
    })

    setInterval(() => {
        socket.write((buffer.writeInt32LE(sum,0), buffer));
    }, 5000);

}).listen(PORT, HOST);

server.on("error", (e) => {
    console.log(`error: ${e.message}`);
});

server.on("listening", () => {
    console.log(`port: ${PORT} host: ${HOST}`);
});