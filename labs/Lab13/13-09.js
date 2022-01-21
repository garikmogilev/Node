const UDP = require("dgram");

const PORT = 5000;
const HOST = "localhost";

let server = UDP.createSocket("udp4");

server.bind(PORT, HOST);

server.on("message", (message, info) => {
    console.log(`message: ${message.toString()}`);
    console.log(`info client: ${info.address}:${info.port}`);

    server.send(`Echo: ${message.toString()}`,info.port, info.address,
        (
            error =>
            {
                if(error) console.log(error.message);
                else console.log("Sent");
            }
        )
    );
})

server.on("listening", () => {
    console.log(`Server ${server.address().address}:${server.address().port}`);
});

server.on("close", () => console.log(`Closed`));