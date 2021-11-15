let http = require("http");
let data = "";
let options = {
    host: "localhost",
    path: "/09-02?x=5&y=3",
    port: "3000",
}

http.get(options, (response) => {
    console.log("HTTP response statusCode: ", response.statusCode);
    console.log("HTTP response statusMessage: ", response.statusMessage);

    response.on('data', (chunk) => {
        data += chunk;
    })

    response.on('end', ()=>{
        console.log(data);
    })
});