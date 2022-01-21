const NetSocket = require("net");
const PORT = 2000;
const HOST = "localhost";

const server = new NetSocket.createServer(socket => {

    console.log(`Server listen port ${PORT}, HOST ${HOST}`);

    socket.on("data", (data => {
        console.log(`DATA: ${data}`);
        socket.write(`ECHO: ${data}`);
    }))

}).listen(PORT, HOST);

server.on("error", (e) => {
    console.log(`error: ${e.message}`);
});