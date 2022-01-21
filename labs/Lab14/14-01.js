const sql = require("mssql/msnodesqlv8");
const http = require("http");
const dispatcher = require("../Lab14/modules/dispatcher");

const connectionPool = new sql.ConnectionPool({
    database: "UNIVERSITY",
    server: "localhost",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    },
    pool:{min:0, max:10}
});

let pool = connectionPool.connect()
    .then(() => {
        console.log(`connected!`);
    })
    .catch((e) => {
        console.log(`Error: \n code: ${e.code} \n ${e.message}`);
    });

const server = http.createServer((request, response) => {
    dispatcher({pool, connectionPool, request, response});
}).listen(4000, "0.0.0.0");

