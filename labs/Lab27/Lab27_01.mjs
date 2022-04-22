import {createClient} from "webdav";
import express from "express"
import bodyParser from "body-parser";
const app = express();

const client = createClient(
    "https://webdav.yandex.ru",
    {/*
        username: "jdatos",
        password: "doarfxzcfgutmhfv"*/
        username: "jdatos",
        password: "doarfxzcfgutmhfv"
    }
)

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/md/:name",  (req, res) => {
    let nameDir = req.params.name;
    client.exists(nameDir)
        .then((result) => {
            if(!result)
                client.createDirectory(nameDir)
                    .then(() => res.status(200).send(`create dir ${nameDir}`))
            else
                res.status(408).send(`exist dir ${nameDir}`)
        })


});

app.post("/rd/:name",  (req, res) => {
    let name = req.params.name;
    console.log(name)
    client.exists( name)
        .then((result) => {
            if(result)
                client.deleteFile(name)
                    .then(() => res.status(200).send(`delete dir ${name}`))
            else
                res.status(404).send(`not exist dir ${name}`)
        })
});

app.post("/up/:name",  (req, res) => {
    let name = req.params.name;
    console.log(name)
    client.exists(name)
        .then((result) => {
            if(!result) {
                req.pipe(client.createWriteStream(name));
                res.status(200).send(`file ${name} upload`);
            }else
                res.status(408).send(`exist file ${name}`)
        })
});

app.post("/down/:name",  (req, res) => {
    let name = req.params.name;
    console.log(name)
    client.exists(name)
        .then((result) => {
            if(result) {
                let fr = client.createReadStream(name);
                fr.pipe(res);
                res.attachment(name);
            }else
                res.status(408).send(`not exist file ${name}`)
        })
});


app.post("/del/:name",  (req, res) => {
    let name = req.params.name;
    console.log(name)
    client.exists( name)
        .then((result) => {
            if(result)
                client.deleteFile(name)
                    .then(() => res.status(200).send(`delete file ${name}`))
            else
                res.status(404).send(`not exist file ${name}`)
        })
});

app.post("/copy/:name/:new",  (req, res) => {
    let name = req.params.name;
    let newName = req.params.new;
    console.log(name, newName)

    client.exists(name)
        .then((result) => {
            if(result)
                client.copyFile(name, newName)
                    .then(() => res.status(200).send(`copy file ${name} to new ${newName}`))
            else
                res.status(404).send(`not exist file ${name}`)
        })
});

app.post("/move/:name/:new",  (req, res) => {
    let name = req.params.name;
    let newName = req.params.new;
    console.log(name, newName)

    client.exists(name)
        .then((result) => {
            if(result)
                client.moveFile(name, "images/" + newName)
                    .then(() => res.status(200).send(`move file ${name} to new ${newName}`))
            else
                res.status(404).send(`not exist file ${name}`)
        })
});

/*
client.exists("/images").then(() => console.log("exist"))


client.getDirectoryContents("/images").then(result => console.log(result))
let rs = fs.createReadStream("img1.jpeg");
let ws = client.createWriteStream("images/img1.jpeg");
rs.pipe(ws);*/

app.listen(3000)
