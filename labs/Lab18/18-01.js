const Sequelize = require("sequelize");
const http = require("http");
const dispatcher = require("./modules/dispatcher");
const sequelize = new Sequelize(
    'master',
    'skvortsoff',
    '9I50ybkubu',
    {host: 'WIN-PH09AJEC5HS', dialect: 'mssql'}
);

/*** {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} ***/
const collections = require("./models/models").ORM(sequelize);

sequelize.authenticate()
    .then(() => {
        console.log(`connected!`);
        TransactionTest();
    })
    .catch((e) => {
        console.log(e);
    });

http.createServer((request, response) => {
    dispatcher({collections, request, response});
}).listen(4000, "0.0.0.0");

let TransactionTest = (values, options) =>{
    sequelize.transaction({isolatedLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED})
        .then( t => {
            collections.Auditorium.update(
                {auditorium_capacity: 0},
                { where:{auditorium_capacity: {[Sequelize.Op.gte]:0}}},
                {transaction: t}
            )
                .then(() => console.log("result"))
                    .catch(err => console.log(err));

            setTimeout(() => {
                t.rollback();
            }, 8000)
        })
}


