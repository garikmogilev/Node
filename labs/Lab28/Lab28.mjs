import express from "express";
import bodyParser from "body-parser";
import jsonRouter from "express-json-rpc-router"

const app = express();
app.use(bodyParser.json());

const methods = {
    sum(params, raw) {
        let result = 0;
        for (const val of params) {
            result += val;
        }
        return result;
    },
    mul(params, raw) {
        let result = 1;
        for (const val of params) {
            result *= val
        }
        return result;
    },
    div(params, raw) {
        return params[0] / params[1];
    },
    proc(params, raw) {
        return params[0] / params[1] * 100;
    }

}

const validator_1 = (params, _, raw) => {
    console.log("validator_1 params %s", params.toString())

    if(!Array.isArray(params))
        throw new Error("Use in params type of array");

    for (const val of params) {
        if(!Number.isInteger(val))
            throw new Error("Only integer  number");
    }
    return params;
}

const validator_2 = (params, _, raw) => {
    console.log("validator_2 params %s", params.toString())

    if(params[1] === 0)
        throw new Error("Second param is 0 (dividing on zero)")

    if(params.length !== 2)
        throw new Error("There should be two parameters")

    if(!Array.isArray(params))
        throw new Error("Use in params type of array");

    for (const val of params) {
        if(!Number.isInteger(val))
            throw new Error("Only integer number");
    }
    return params;
}

const beforeController = {
    sum: (params, _, raw) => validator_1(params, _, raw),
    mul: (params, _, raw) => validator_1(params, _, raw),
    div: (params, _, raw) => validator_2(params, _, raw),
    proc: (params, _, raw) => validator_2(params, _, raw)


};

const afterController =  {
    sum: [(params, result, raw) => console.log("sum %d", result)],
    mul: [(params, result, raw) => console.log("mul %d", result)],
    div: [(params, result, raw) => console.log("div %d", result)],
    proc: [(params, result, raw) => console.log("proc %d", result)],
}

app.use(jsonRouter({
    methods: methods,
    beforeMethods: beforeController,
    afterMethods: afterController,
    onError(err){console.log(err)}
}))

app.listen(3000, () => console.log("server listen"));