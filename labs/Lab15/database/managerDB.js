const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const uri = "mongodb+srv://skvortsoff:9I50ybkubu@cluster0.gfcp8.mongodb.net/university?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const db = client.db();
let EventEmitter   = require('events');
const Console = require("console");

const E500 = (response, message) => {
    response.writeHead(500, {"Content-type":"text/json"});
    response.end(JSON.stringify({code:500, message: message}));
}

class ManagerDB extends EventEmitter{
    connected = false;

    constructor() {
        super();
        client.connect().then(err => {
            if(err)  {
                console.log("connect successful");
                this.connected = true;
                //this.init().then((msg) => console.log(msg)); нициализация БД
            }else
                console.log("error connect: " + err) ;
        });
    }

    async init(){
        let pulpits = await db.collection('pulpit');
        let faculties = await db.collection('faculty');

        const pulpitsJSON = "JSON/PULPIT.json";
        const facultiesJSON = "JSON/FACULTY.json";

        await fs.access(pulpitsJSON, fs.constants.F_OK, (err => {
            if (err) {
                Console.error(err.code + err.message);
                return `File ${pulpitsJSON} not found`;
            }
            else
            {
                pulpits.find({}).toArray((error, result) => {
                    if(result.length === 0){
                        pulpits.insertMany(JSON.parse(fs.readFileSync(pulpitsJSON).toString("utf-8")));
                        console.log("Objects pulpit, init");
                    }
                    else {
                        pulpits.drop();
                        pulpits.insertMany(JSON.parse(fs.readFileSync(pulpitsJSON).toString("utf-8")));
                        console.log("Objects pulpit, init");
                        console.log("Objects pulpit, drop");
                    }
                })
            }
        }))

        await fs.access(facultiesJSON, fs.constants.F_OK, (err => {
            if (err) {
                Console.error(err.code + err.message);
                return `File ${facultiesJSON} not found`;
            } else {
                faculties.find({}).toArray((error, result) => {
                    if(result.length === 0){
                        faculties.insertMany(JSON.parse(fs.readFileSync(facultiesJSON).toString("utf-8")));
                        console.log("Objects faculties, init");
                    }
                    else {
                        console.log("Objects faculties, drop");
                        faculties.drop();
                        faculties.insertMany(JSON.parse(fs.readFileSync(facultiesJSON).toString("utf-8")));
                        console.log("Objects faculties, init");
                    }
                })

            }
        }))
    }

    async getPulpits(response){

        try {
            let pulpits = await db.collection('pulpit');
            pulpits.find({}).toArray((error, result) => {
                response.writeHead(200, {"Content-Type":"text/json"})
                response.end(JSON.stringify(result));
            });
        }
        catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "getPulpits";
    }

    async getFaculties(response){

        try {
            let faculties = await db.collection('faculty');
            faculties.find({}).toArray((error, result) => {
                response.writeHead(200, {"Content-Type":"text/json"})
                response.end(JSON.stringify(result));
            });
        }catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "getFaculties";
    }


    async insertPulpits(request, response) {

        try {
            let pulpits = await db.collection('pulpit');
            await request.on("data", data => {
                pulpits.insertOne(JSON.parse(data));
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(data);
            })
        }
        catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "insertPulpits";
    }

    async insertFaculties(request, response) {
        try {
            let faculties = await db.collection('faculty');
            await request.on("data", data => {
                faculties.insertOne(JSON.parse(data));
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(data);
            });
        }catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "insertFaculties";
    }

    async  updateFaculties(request, response) {

        try {
            let faculties = await db.collection('faculty');
            await request.on("data", data => {
                let faculty = JSON.parse(data);

                faculties.updateOne(
                    {FACULTY:faculty.FACULTY},
                    {$set:{FACULTY_NAME:faculty.FACULTY_NAME}}
                );
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(data);
            })
        }
        catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "updatePulpits";
    }

    async updatePulpits(request, response) {

        try {
            let pulpits = await db.collection('pulpit');
            await request.on("data", data => {
                let pulpit = JSON.parse(data);

                pulpits.updateOne(
                    {PULPIT:pulpit.PULPIT},
                    {$set:{PULPIT_NAME:pulpit.PULPIT_NAME, FACULTY:pulpit.FACULTY}}
                );
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(data);
            })
        }
        catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "updateFaculties";
    }

    async  deleteFaculties(faculty, response) {

        try {
            let faculties = await db.collection('faculty');

            let result = faculties.updateOne(
                {FACULTY:faculty}
            );
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            response.end(JSON.stringify(result));
        }
        catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "deleteFaculties";
    }

    async deletePulpits(pulpit, response) {

        try {
            let pulpits = await db.collection('pulpit');

            let result = pulpits.deleteOne(
                {PULPIT:pulpit}
            );
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            response.end(JSON.stringify(result));
        }
        catch (e) {
            E500(response, e.message);
            return e.message;
        }

        return "deletePulpits";
    }
}

module.exports = ManagerDB;