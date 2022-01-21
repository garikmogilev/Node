let WebSocket = require('ws');
let param2 = process.argv[2];

let client = new WebSocket('ws://localhost:4000/');

client.on('open', () =>
{
    setInterval(()=>
    {
        client.send(JSON.stringify({client: param2, timestamp: new Date().toISOString()}));
    }, 10000);

    client.on('message', (message) =>
    {
        console.log('response message: ' + message);
    });
});