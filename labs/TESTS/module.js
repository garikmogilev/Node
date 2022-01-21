const fs = require("fs");
const axios = require("axios");

let fsOperations = async () => {
    //let data = await fs.readFile("./file.json");
    let rs = fs.createReadStream("./file.json");
    rs.on("data", (data) => {
        process.stdout.write(data);
    })
}

fsOperations().then(() => console.log("Done"));

let req = async () => {
    let response = await axios(
        {
            url:"http://localhost:3000/api/get",
            method:"get",
            headers:{
                "Content-type":"text/plain"
            },
            data:{x:1, y:2}
        }
    )
    console.log(response.data);

}
req();
