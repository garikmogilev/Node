const fs = require("fs");
const path = require("path");

function E404 (response){
    response.writeHead(404, {"Content-type":"text/json"});
    response.end(JSON.stringify({code:404, message: "End point not found"}));
}

const index = "static/index.html";

class responder {
    constructor(param) {
        this.folder = param;
    }

    sender(response, url){
        if(url === "" || url === "/")
            this.getIndex(response);

        const dirname = path.dirname(url).slice(1);
        console.log(dirname);
        const file = this.folder + url;
        //console.log(file);

        switch (dirname) {
            case "css":
                fs.access(file, fs.constants.F_OK,(err => {
                    if(err) {
                        E404(response);
                    }else {
                        fs.readFile(file,(err, data) =>{
                            if(err)
                                E404(response);
                            else {
                                response.writeHead(200, {"Content-type": "text/css"});
                                response.end(data);
                            }
                        })
                    }
                }))
                break;
            case "javaScript":
                fs.access(file, fs.constants.F_OK,(err => {
                    if(err) {
                        E404(response);
                    }else {
                        fs.readFile(file,(err, data) =>{
                            if(err)
                                E404(response);
                            else {
                                response.writeHead(200, {"Content-type": "application/javascript"});
                                response.end(data);
                            }
                        })
                    }
                }))
                break;
            case "music":
                fs.access(file, fs.constants.F_OK, (err => {
                    if(err)
                        E404(response)
                    else
                    {
                                response.writeHead(200,{
                                    "Content-type":"audio/mpeg",
                                    'Content-Length': fs.statSync(file).size
                                })
                                fs.createReadStream(file).pipe(response);
                    }
                }))
                break;
            case "docs":
                fs.access(file, fs.constants.F_OK,(err => {
                            response.writeHead(200,{
                                "Content-type":"application/msword",
                                'Content-Length': fs.statSync(file).size});
                            fs.createReadStream(file).pipe(response);
                }))
                break;
            case "img":
                fs.access(file, fs.constants.F_OK,(err => {
                    fs.readFile(file, ((error, data) => {
                        if(error)
                            E404(response);
                        else
                        {
                            response.writeHead(200,{"Content-type":"image/jpeg"});
                            response.end(data);
                        }
                    }))
                }))
                break;
            case "json":
                fs.access(file, fs.constants.F_OK,(err => {
                    fs.readFile(file, ((error, data) => {
                        if(error)
                            E404(response);
                        else
                        {
                            response.writeHead(200,{"Content-type":"text/json"});
                            response.end(data);
                        }
                    }))
                }))
                break;
            case "xml":
                fs.access(file, fs.constants.F_OK,(err => {
                    fs.readFile(file, ((error, data) => {
                        if(error)
                            E404(response);
                        else
                        {
                            response.writeHead(200,{"Content-type":"text/xml"});
                            response.end(data);
                        }
                    }))
                }))
                break;

        }
    }

    getIndex(response){
        console.log(index);
        fs.access(index, fs.constants.F_OK,(err => {
            if (err)
                E404(response);
            else {
                fs.readFile(index, ((err, data) => {
                        response.writeHead(200, {"Content-type": "text/html"});
                        response.end(data);
                    })
                )
            }
        }))
    }
}

module.exports = (param) => new responder(param);