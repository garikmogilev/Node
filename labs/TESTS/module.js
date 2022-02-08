const http = require("http");

http.createServer(((req, res) => {
    console.log("req");
    req.on("data", chunk => {
        console.log(chunk.toString());
        res.writeHead(200, {"Content-type":"text/plain"})

    })
    req.on("end", () => res.end("1234"))
})).listen(1234, "localhost");