const nodemailer = require('nodemailer');
const http = require("http");
const url = require("url");
const fs = require("fs");
const Console = require("console");

const page = "./index.html";


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'garikmogilev@gmail.com',
        clientId: '288905132145-a1ria75i7170tsqecn5j429nqmqd5qlq.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04QtqvogT--GGCgYIARAAGAQSNwF-L9IroxyavAZcuDozuaGgO2IZWb5mq_vhhCKGBgscq0hbydar2A_IesBPjqrO966T6IKjkds',
        accessToken: 'ya29.a0ARrdaM-HayKjp2q5PMd6RrW6F9_9iuM8ebzXELQo18Ewg2MVxXl9gnA1npNusPZYBQcCOv6u-EgdkIqa-bMVMA5eMTVHqZfOeK8nWHasFDP0XnnefEHNiTUNPZUgvFk_9ssDk3e7M_W6DEATPL4BszS8ND01'
    }
});


let send =  (mailOptions) => {transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});}


http.createServer(function (request, response){

    if(url.parse(request.url).pathname === "/" || url.parse(request.url).pathname === ""){
        response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
        fs.access(page, fs.constants.F_OK, (err)=> {
            if (err) {
                Console.error(err.code + err.message);
                response.end(err.code + err.message);
            } else {
                let file = fs.readFileSync(page);
                response.end(file);
            }
        })
    } else {
        if(url.parse(request.url).pathname === "/send"){
            let email = url.parse(request.url, true).query.email;
            let subject = url.parse(request.url, true).query.subject;
            let message = url.parse(request.url, true).query.message;

            let mailOptions = {
                from: 'garikmogilev@gmail.com',
                to: email,
                subject: subject,
                text: message
            };
            send(mailOptions);
        }
    }
}).listen(3000);