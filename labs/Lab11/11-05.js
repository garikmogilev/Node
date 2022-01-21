const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({port:4000, host:'localhost', path:'/'});

server.setAuth(l =>{return l.login === 'user' && l.password === 'password'});

server.register('square', square).public();

server.register('sum', (params) => params.reduce((a, b) => a + b, 0)).public();
server.register('mul', (params) => params.reduce((a, b) => a * b, 1)).public();

server.register('fib',  (params) => {
    let sequence = [];
    for (let i = 1; i <= params[0]; i++) {
        sequence.push(fibn(i));
    }
    return sequence;
}).protected();

server.register('fact', fact).protected();
server.register('fibn', fibn).protected();

function square(args)
{
    if (args.length === 1)
    {
        return Math.PI * args[0]*args[0];
    }
    else
    if (args.length === 2)
    {
        return args[0] * args[1];
    }
    else
    {
        return 0;
    }
}

function fibn(n)
{
    return n < 2 ? n : fibn(n - 1) + fibn(n - 2);
}

function fact(n)
{
    if (n[0] === 0){return 1;}
    return n === 0 ? 1 : n * fact(n - 1);
}
