import express from "express";

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
        res.sendFile("D:\\GitHub\\Node\\labs\\NodeJS\\Lab29\\public\\wasm.html");
})
app.listen(3000)

//emcc --no--entry -o out.wasm p.c