"use strict";

let http = require("http");
http.createServer((request, response) => {
        response.end("response 1213");
}).listen(3000, "localhost", () => console.log("localhost:3000"));
