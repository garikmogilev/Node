const NetSocket = require("net");

const PORT = 2000;
const HOST = "localhost";


let buffer = Buffer.allocUnsafe(4);
let connections = new Map();

let label = (pfx, port, sock) => {
    return `${pfx}${sock.remoteAddress}${sock.remotePort}`;
}

const server = new NetSocket.createServer((socket) => {
    console.log(`Server listen port ${PORT}, HOST ${HOST}`);

    socket.id = (new Date()).toISOString();
    connections.set(socket.id, {sum: 0});
    server.getConnections((e, c) => {
        if(!e){
            console.log(label("connected", PORT, socket) + c);
            for(let [key, value] of connections){
                console.log(key, value.sum);
            }
        }
    });

    socket.on("data", (data) => {
        connections.get(socket.id).sum += data.readInt32LE();
        console.log(label("data", PORT, socket) + connections.get(socket.id).sum);
    });

    setInterval(() => {
        socket.write((buffer.writeInt32LE(connections.get(socket.id).sum,0), buffer));
    }, 5000);

    socket.on("error", (e) => {
        console.log(label("error", PORT, socket));
    });

    socket.on("close", (e) => {
        console.log(label("close", PORT, socket));
    });

}).listen(PORT, HOST);



server.on("listening", () => {
    console.log(`port: ${PORT} host: ${HOST}`);
});