const WebSocket = require("ws");
let parm2 = process.argv[2];

let prefix = typeof parm2 == "undefined"?"def" : parm2;

const socketclient = new WebSocket("ws://localhost:5000/broadcast");

socketclient.on("open", () => {

    let k = 0;

    setInterval(() => {
        socketclient.send(`client:  ${prefix}-${k++}`);
    }, 1000).unref();

    socketclient.on("message", (message) => {
        console.log(`received: ${message}`);
    });

    setTimeout(() => socketclient.close(), 25000);
})
