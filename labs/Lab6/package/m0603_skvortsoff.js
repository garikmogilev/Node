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
        refreshToken: '1//04X_O0Pyh_atMCgYIARAAGAQSNwF-L9IrKB3N49349u39xh2o6ixVNris7iBD0yz7z9t43Z6EBXRaHGAXBV-QInF-umDn9jk4c8M'
    }
});




let send = function (message, accessToken) {
    transporter.set.accessToken = accessToken;

    let mailOptions = {
        from: 'garikmogilev@gmail.com',
        to: 'potato.papaya.24@gmail.com',
        subject: 'subject',
        text: message,
        auth: {accessToken: accessToken}
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = send;