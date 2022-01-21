let ee   = require('events');
const fs = require("fs");
let db_data = [];
const dir = "./backups/";

function DB() {

     this.init = async (fileName) => {
         return new Promise(resolve => {
             this.file = fileName;

             fs.access(fileName, fs.constants.F_OK, e => {
                 if(e){
                     console.log("File not exist");
                     fs.open(this.file, "w",(e, file) => {
                         if(e){
                             console.log(e);
                         }
                         console.log("Created file: " + this.file);
                     });
                 }else{
                     db_data = JSON.parse(fs.readFileSync(this.file).toString());
                     resolve();
                 }
             })
         });

    }

    this.getAll = () => {
        return JSON.stringify(db_data);
    }

    this.get = (id) => {
        for (let i = 0; i < db_data.length; i++) {
            if(db_data[i].id === id){
                return JSON.stringify(db_data[i]);
            }
        }
        return null;
    };

    this.insert = (obj) => {
        let founded = false;
        db_data.forEach(o => {
            if(obj.id === o.id){
                founded = true;
            }
        });
        if(founded){
            return null;
        }else {
            db_data.push(obj);
            this.rewriteFile();
            return obj;
        }
    };

    this.update = (obj) => {
        let id = Number.parseInt(obj.id);
        let found = false;
        for (let i = 0; i < db_data.length; i++) {
            if(db_data[i].id === id){
                found = true;
                db_data[i] = obj;
                break;
            }
        }

        if(found){
            this.rewriteFile();
            return db_data[id - 1];
        }else {
            return null;
        }
    }

    this.delete = (obj) => {
        let id = Number.parseInt(obj);
        let result = false;

        let elementIndex = db_data.findIndex(el => Number(el.id) === id);

        if(elementIndex !== -1){
            result = db_data[elementIndex];
            db_data.splice(elementIndex, 1);
            this.rewriteFile();
            return result;
        }else {
            return null;
        }
    }

    this.backup = () =>{
        let date = new Date();
        let fileName = dateFormat(date, "%Y%m%d_%H_%M_%S", true);
        let path = dir + fileName +  "students.txt";
        console.log(path);
        setTimeout(() =>{
            fs.copyFile(this.file, path, (err =>
            {
                if(err) console.log("Error copy");
                else console.log(">>>> backup");
            }))},2000);
    }

    this.rewriteFile = () => {
        fs.writeFile(this.file, JSON.stringify(db_data),(err => {
                if (err) console.log("Error: ", err.message);
                else console.log("Rewrite file");
            })
        );
    }

    function dateFormat (date, fstr, utc) {
        utc = utc ? 'getUTC' : 'get';
        return fstr.replace (/%[YmdHMS]/g, function (m) {
            switch (m) {
                case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
                case '%m': m = 1 + date[utc + 'Month'] (); break;
                case '%d': m = date[utc + 'Date'] (); break;
                case '%H': m = date[utc + 'Hours'] (); break;
                case '%M': m = date[utc + 'Minutes'] (); break;
                case '%S': m = date[utc + 'Seconds'] (); break;
                default: return m.slice (1); // unknown code, remove %
            }
            // add leading zero if required
            return ('0' + m).slice (-2);
        });
    }
}

require('util').inherits(DB, ee.EventEmitter);
exports.DB  = DB;