let http = require("http");
const fs = require("fs");
let data = "";

let bound = 'smw60-smw60-smw60';

let body =`--${bound}\r\n`  +
'Content-Disposition:form-data; name="file"; Filename="MyFile.txt"\r\n' +
'Content-Type:text/plain\r\n\r\n' +
fs.readFileSync('./static/MyFile.txt') +
`\r\n--${bound}--\r\n`;

let options = {
    host: "localhost",
    path: "/09-06",
    port: "3000",
    method: "post",
    headers: {'Content-Type':`multipart/form-data; boundary=${bound}`}
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

client.write(body);
client.end();