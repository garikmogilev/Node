let http = require("http");

let data = "";
let options = {
    host: "localhost",
    path: "/09-05",
    port: "3000",
    method: "post"
}

let client = http.request(options, (response) => {
    console.log("HTTP response statusCode: ", response.statusCode);
    console.log("HTTP response statusMessage: ", response.statusMessage);

    response.on('data', (chunk) => {
        data += chunk;
    })

    response.on('end', ()=>{
        console.log(data);
    })
});

client.write(
    "<request id = '23'>" +
        "<x value = '1'/>" +
        "<x value = '2'/>" +
        "<x value = '3'/>" +
        "<x value = '4'/>" +
        "<m value = 'a'/>" +
        "<m value = 'b'/>" +
        "<m value = 'c'/>" +
        "<m value = 'd'/>" +
    "</request>"
);

client.end();