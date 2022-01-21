const sql = require('mssql/msnodesqlv8');
const {pool} = require("mssql/lib/global-connection");
let connectionPool;

let config = new sql.ConnectionPool({
    database: "UNIVERSITY",
    server: "localhost",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
});

class DataBase
{
    constructor()
    {
        connectionPool = config.connect();
    }

    query(query)
    {
        return connectionPool
            .then(pool => pool.query(query))
            .then(response => response.recordset);
    }

    getAll(tableName)
    {
        return connectionPool
            .then(pool => pool.query(`SELECT * FROM ${tableName}`))
            .then(response => response.recordset);
    }

    getPulpitsFaculty(faculty){
        let sql =  `SELECT * FROM SUBJECT s JOIN PULPIT p ON s.PULPIT = p.PULPIT JOIN FACULTY f ON p.FACULTY = f.FACULTY WHERE p.FACULTY = N'${faculty}';`

        return connectionPool
            .then(pool => pool.query(sql))
            .then(response => response.recordset);
    }

    getTeachersFaculty(faculty){
        let sql = `SELECT * FROM TEACHER t JOIN PULPIT p ON t.PULPIT = p.PULPIT JOIN FACULTY f ON p.FACULTY = f.FACULTY WHERE p.FACULTY = N'${faculty}';`
        return connectionPool
            .then(pool => pool.query(sql))
            .then(response => response.recordset);
    }

    getOne(tableName, fields)
    {
        return connectionPool.then(pool =>
        {
            const request = pool.request();
            let command = `SELECT TOP(1) * FROM ${tableName} WHERE`;
            Object.keys(fields).forEach(field =>
            {
                command += ` ${field} = N'${fields[field]}' AND`;
            });
            command = command.slice(0, -3);
            return request.query(command);
        }).then(response => response.recordset);
    }

    insert(tableName, fields)
    {
        return connectionPool.then(pool =>
        {
            const request = pool.request();
            let command = `INSERT INTO ${tableName} values (`;
            Object.keys(fields).forEach(field =>
            {
                command += `N'${fields[field]}',`;
            });
            command = command.replace(/.$/,")");
            return request.query(command);
        });
    }

    async getExist(table, name){
        return connectionPool
            .then(pool => pool.query(`select * from ${table} where ${table} = N'${name}'`))
            .then(response => response.recordset);
    }

    update(tableName, fields)
    {
        connectionPool.then(pool =>
        {
            let count = 0;
            let command = `UPDATE ${tableName} SET `;
            let where = {field: "", value:""};
            Object.keys(fields).forEach(field =>
            {
                if(count === 0){
                    where.field = field;
                    where.value = fields[field];
                    count++;
                }else {
                    command += `${field} = N'${fields[field]}',`;
                }
            });
            command = command.slice(0, -1);
            command += ` WHERE ${where.field} = N'${where.value}'`;
            pool.query(command);
        });
    }

    deleteRow(tableName, keyId)
    {
        return connectionPool.then(pool =>
        {
            let sql = `DELETE FROM ${tableName} WHERE ${tableName} = N'${keyId}'`;
            return pool.query(sql);
        });
    }
}

module.exports = DataBase;