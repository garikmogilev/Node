const fs = require("fs");
const bodyParser = require('body-parser');

class Guide {
    constructor() {
        this.guide = JSON.parse(fs.readFileSync("guide.json").toString());
        this.index = this.guide[this.guide.length -1].id;
        this.commit = true;

        setInterval(()=> {
            if(!this.commit) {
                this.save();
                console.log("commit");
                this.commit = true;
            }
        },2000)
    }
    add(req){
        let name = req.body.name;
        let phone = req.body.phone;
        if(name === null || phone === null)
            return false;

        this.guide.push({id: ++this.index, name: name, phone: phone });
        this.commit = false;
        return true;
    }
    get(req){
        let id = req.body.id;
        if(id === null)
            return false;

        let contact = null
        for (let guide of this.guide) {
            if(guide.id == id){
                return guide;
            }
        }
        return contact;
    }
    getAll(){
        return this.guide;
    }
    upd(element){
        for (let guide of this.guide) {
            if(guide.id == element.id){
               guide.name = element.name;
               guide.phone = element.phone;
                this.commit = false;
            }
        }
    }
    del(id){
        for (let i = 0; i < this.guide.length; i++) {
            if(this.guide[i].id == id){
                this.guide.splice(i, 1);
                this.commit = false;
            }
        }
    }
    save(){
        fs.writeFileSync("guide.json", JSON.stringify(this.guide ));
    }
}
module.exports = Guide;