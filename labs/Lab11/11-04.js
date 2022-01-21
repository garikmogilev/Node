let WebSocket = require('ws');

let counter = 0;

let server = new WebSocket.Server({port: 4000, host: 'localhost'});

server.on('connection', (clientSocket) =>
{
    clientSocket.on('message', (data) =>
    {
        let messageJSON = JSON.parse(data);
        console.log('client message: ' + data);

        clientSocket.send(JSON.stringify({server: ++counter,
                        client: messageJSON.client,
            timestamp: messageJSON.timestamp}));
    });
});