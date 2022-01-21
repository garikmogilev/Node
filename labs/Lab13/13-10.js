const UDP = require("dgram");

const PORT = 5000;
const HOST = "localhost";
let message = "Hello";

let client = UDP.createSocket("udp4");

client.on("message", (message) => {
    console.log(`message ${message.toString()}`);
})

setInterval( () => {
    client.send(message,PORT, HOST,
        (
            error =>
            {
                if(error) console.log(error.message);
                else console.log("Sent");
            }
        )
    )
},1000);

client.on("listening", () => {
    console.log(`client ${client.address().address}:${client.address().port}`);
});

client.on("close", () => console.log(`Closed`));