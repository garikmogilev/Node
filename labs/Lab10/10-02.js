const WebSocket = require("ws");

const socketclient = new WebSocket("ws://localhost:4000/wsserver");

let i = 0;
socketclient.on("open", () => {

    setInterval(()=> {
        socketclient.send(++i);
    }, 3000).unref();

    socketclient.on("message", message => {console.log(message.toString())});

    setTimeout(() => {
        socketclient.close();
    }, 25000);
})