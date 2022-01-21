const managerDB = require("../Lab15/database/ManagerDB");
const http = require("http");
const url = require("url");
const index = require("async");

let DB = new  managerDB();
const E404 = (response) => {
    response.writeHead(404, {"Content-type":"text/json"});
    response.end(JSON.stringify({code:404, message: "End point not found"}));
}

const E500 = (response) => {
    response.writeHead(500, {"Content-type":"text/json"});
    response.end(JSON.stringify({code:500, message: "Mongo not connected, please try again"}));
}


http.createServer((request, response) => {
    if(DB.connected)
        DB.emit(request.method, request, response);
    else
        E500(response);

}).listen(3000, "localhost", () => console.log("localhost:3000"));

DB.on("GET", async (request, response) => {
    if(url.parse(request.url).path === "/pulpits")
        DB.getPulpits(response).then(r => console.log(r));
    else if(url.parse(request.url).path === "/faculties")
        DB.getFaculties(response).then(r => console.log(r));
    else
    {
        E404(response);
    }
})

DB.on("POST", async (request, response) =>{
    if(url.parse(request.url).path === "/pulpits")
        DB.insertPulpits(request, response).then(r => console.log(r));
    else if(url.parse(request.url).path === "/faculties")
        DB.insertFaculties(request, response).then(r => console.log(r));
    else
    {
        E404(response);
    }
})

DB.on("PUT", async (request, response) =>{
    if(url.parse(request.url).path === "/pulpits")
        DB.updatePulpits(request, response).then(r => console.log(r));
    else if(url.parse(request.url).path === "/faculties")
        DB.updateFaculties(request, response).then(r => console.log(r));
    else
    {
        E404(response);
    }
})

DB.on("DELETE", async (request, response) => {
    let arrayURL = decodeURI(request.url).split("/");

    if(arrayURL[1] === "pulpits")
        DB.deletePulpits(arrayURL[2], response).then(r => console.log(r));
    else if(arrayURL[1]  === "faculties")
        DB.deleteFaculties(arrayURL[2], response).then(r => console.log(r));
    else
    {
        E404(response);
    }
})
