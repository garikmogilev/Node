const async = require('async');
const rpcWSC = require('rpc-websockets').Client;

const ws = new rpcWSC('ws://localhost:4000/');

let h = (x=ws) => async.parallel(
    {
        fact_2: cb => 
        {
            ws.login({login: 'user', password: 'password'})
                .then(() =>
                {
                    ws.call('fact', [20])
                        .catch((e)=>cb(e,null))
                        .then((r)=>{ cb(null,r)});
                })
        },
        square_1: cb => {
            ws.call('square', [3])
                .catch((e)=>cb(e,null))
                .then((r)=>{ cb(null,r)});},
        square_2: cb => {
            ws.call('square', [5,4])
                .catch((e)=>cb(e,null))
                .then((r)=>{cb(null,r)});},
        sum_1: cb => {
            ws.call('sum', [2])
                .catch((e)=>cb(e,null))
                .then((r)=>{ cb(null,r)});},
        sum_2: cb => {
            ws.call('sum', [2,4,6,8,10])
                .catch((e)=>cb(e,null))
                .then((r)=>{ cb(null,r)});},
        mul_1: cb => {
            ws.call('mul', [3])
                .catch((e)=>cb(e,null))
                .then((r)=>{ cb(null,r)});},
        mul_2: cb => {
            ws.call('mul', [3,5,7,9,11,13])
                .catch((e)=>cb(e,null))
                .then((r)=>{ cb(null,r)});},

        fib_1: cb => {ws.login({login: 'user', password: 'password'})
            .then(() =>
            {
                ws.call('fib', [7])
                    .catch((e)=>cb(e,null))
                    .then((r)=>{ cb(null,r)});
            })},
        fact_1: cb => 
        {
            ws.login({login: 'user', password: 'password'})
                .then(() =>
                {
                    ws.call('fact', [10])
                        .catch((e)=>cb(e,null))
                        .then((r)=>{ cb(null,r)});
                })
        }
    },
    (e, r)=>{
        if(e) console.log('e = ', e);
        else console.log('r = ', r);
        ws.close();
    });

ws.on('open',h);