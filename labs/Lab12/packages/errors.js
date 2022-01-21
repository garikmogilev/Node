class Errors {
    error1 = {
        error : {
            id: 1001,
            message: "object with id not exist"
        }
    }

    error2 = {
        error : {
            id: 1002,
            message: "object with id exist"
        }
    }

    error3 = {
        error : {
            id: 1003,
            message: "error copy file"
        }
    };

    setHeader(response){
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
    }

    notExist(response){
        this.setHeader(response);
        response.end(JSON.stringify(this.error1));
    }

    idExist(response){
        this.setHeader(response);
        response.end(JSON.stringify(this.error2));
    }
}

exports.Errors = new Errors();