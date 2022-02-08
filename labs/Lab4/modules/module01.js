let util = require('util');
let ee   = require('events');

let db_data =
    [
        {id: 1, name:'Petrov',  bday:'2001-01-01' },
        {id: 2, name:'Ivanov',  bday:'2001-02-02' },
        {id: 3, name:'Sidorov', bday:'2001-03-03' }
    ];

function DB(){
    this.select = (id) => {
        if(id === null){return db_data}
        else {
            let size = db_data.length;

            for (let i = 0; i < size; i++) {
                if(db_data[i].id === id){
                    return db_data[i];
                }
            }
            return {id:-1};
        }

    };
    this.insert = (obj) => {

        if(db_data.length === 0) {
            obj.id = 1;

        }else {
            obj.id = db_data[db_data.length - 1].id + 1;
        }


        db_data.push(obj);
    };
    
    this.update = (obj) =>{
        let size = db_data.length;
        let id = Number.parseInt(obj.id);

        for (let i = 0; i < size; i++) {
            if(db_data[i].id === id){
                db_data[i] = obj;
                break;
            }
        }

    }

    this.delete = (obj) => {
        let id = Number.parseInt(obj);
        const NOT_FOUND = {id:-1};

        let elementIndex = db_data.findIndex(el => Number(el.id) === id);
        return elementIndex !== -1 ? db_data.splice(elementIndex, 1) : NOT_FOUND;
    }
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;