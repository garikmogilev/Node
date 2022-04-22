const https = require("https")
const fs = require("fs")
const express = require('express')
const app = express()

/*let options = {
    key: fs.readFileSync("./security/RS-LAB25-SIA.key").toString(),
    cert: fs.readFileSync("./security/RS-SIA-CRT.crt").toString()
}*/
let options = {
    key: fs.readFileSync("./security/RS-LAB25-TEN-RSAkey").toString(),
    cert: fs.readFileSync("./security/RS-TVN-TEN.crt").toString()
}
console.log(options);

app.get('/', (req, res) =>
{
    console.log("get")
    res.send("https Skvortsoff")
})

https.createServer(options, app).listen({
    port: 3000
}, () => console.log("run"))
