let EventEmitter = require("events").EventEmitter;
let util = require("util");

function Logger(){}

util.inherits(Logger, EventEmitter);


////////////////// лучше в настойщей программе разбить на модули
let logger = new Logger();
logger.on("warning", (code, message) => {
    console.log("code: ",code, " message: ", message);
})

logger.on("error", (code, message) => {
    console.error("code: ",code, " message: ", message);
})

setInterval((err) => {
    logger.emit("warning", err.code, err.message);
},1000, {code:407, message:"file not found"})
