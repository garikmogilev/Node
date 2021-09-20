let http = require("http");
let chunk = null;
let status = "norm";
const reg = "reg = ";
const arrow = "->";

http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
    response.end("<script>prompt('"+ status + "');</script>");
}).listen(3000);

process.stdin.setEncoding("utf-8");
process.stdout.write(status + arrow);

process.stdin.on("readable", () => {

    while ((chunk = process.stdin.read()) !== null){
        if(chunk != null)
            chunk = chunk.trim();

        if (chunk === "norm") {
            process.stdout.write(reg +  status + arrow + " norm\n");
             status = chunk;
        } else if (chunk  === "stop") {
            process.stdout.write(reg +  status + arrow + " stop\n");
             status = chunk ;
        } else if (chunk  === "test") {
            process.stdout.write(reg +  status + arrow + " test\n");
             status = chunk ;
        }else if (chunk  === "exit") {
            process.exit(0);
        }else {
            process.stdout.write(chunk);
        }

        process.stdout.write(status + arrow);
    }
});
