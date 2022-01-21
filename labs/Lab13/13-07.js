const NetSocket = require("net");

const PORT_1 = 40000;
const PORT_2 = 50000;
const HOST = "localhost";

let handler = (port) => {
    return (sock) => {
        console.log(`Port server: ${port} Client: ${sock.remoteAddress}:${sock.remotePort}`);

        sock.on("data", (data) => {
            console.log(`Server: ${port} Data: ${data.readInt32LE(0)}`);
            sock.write(`Echo: ${data.readInt32LE(0)}`);
        });

        sock.on("close", () => {
            console.log(`closed: ${sock.remoteAddress}:${sock.remotePort}`);
        })

    }
};

NetSocket.createServer(handler(PORT_1)).listen(PORT_1, HOST)
    .on(
        "listening", () => {
            console.log(`TCP SERVER: ${HOST}:${PORT_1}`)
        }
    );

NetSocket.createServer(handler(PORT_2)).listen(PORT_2, HOST)
    .on(
        "listening", () => {
            console.log(`TCP SERVER: ${HOST}:${PORT_2}`)
        }
    );

