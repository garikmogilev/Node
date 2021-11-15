let http = require("http");
const fs = require("fs");
let data = "";

let bound = "smw60-smw60-smw60";
let body=`--${bound}\r\n`;
body+='Content-Disposition:form-data; name="file"; Filename="MyFile.png"\r\n';
body+='Content-Type:application/octet-stream\r\n\r\n';

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

let stream = new fs.ReadStream("./static/MyImage.png");

client.write(body);

stream.on('data',(chunk)=>
{
    client.write(chunk);
    console.log(Buffer.byteLength(chunk));
});

stream.on('end',()=>
{
    client.end(`\r\n--${bound}--\r\n`);
});