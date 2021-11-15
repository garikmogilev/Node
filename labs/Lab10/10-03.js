const WebSocket = require("ws");

const socketserver = new WebSocket.Server({port: 5000, host: "localhost", path: "/broadcast"});

socketserver.on("connection", (ws) => {
    ws.on("message", (data) => {
        socketserver.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN)
            {
                client.send("server: " + data);
            }
        })
    })
})