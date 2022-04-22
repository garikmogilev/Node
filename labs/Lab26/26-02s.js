const { ServerSign } = require('./module/Sign');
const fs = require('fs');
const app = require('express')();

app.get('/resource', (req, res, next) =>
{
    let readStream = fs.createReadStream('./files/file.txt');
    res.statusCode = 200;
    readStream.pipe(res);
    readStream.on('close', () =>
    {
        res.end();
    });
});

app.get('/', (req, res, next) =>
{
    const ss = new ServerSign();
    const readStream = fs.createReadStream('./files/encrypted.txt');
    ss.getSignContext(readStream, (cb) =>
    {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(cb));
    });
});

app.listen(3000);