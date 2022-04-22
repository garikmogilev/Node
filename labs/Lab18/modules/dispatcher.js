const handlerGet = require("./handlerGet");
const handlerPost = require("./handlerPost");
const handlerPut = require("./handlerPut");
const handlerDelete = require("./handlerDelete");

/****************** DISPATCHER ******************/
let dispatcher = (params) => {
    switch(params.request.method) {
        case "GET":
            handlerGet(params);
            break;
        case "POST":
            handlerPost(params);
            break;
        case "PUT":
            handlerPut(params);
            break;
        case "DELETE":
            handlerDelete(params);
            break;
    }
}

module.exports = (params) => dispatcher(params);