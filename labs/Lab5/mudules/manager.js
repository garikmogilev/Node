let util = require('util');
const SECOND  = 1000;
const data = require("./module01");
let db = new data.DB();


class Manager {
    requests = 0;
    commits = 0;
    dateRun;
    dateStop;
    sdTimer;
    scTimer;
    ssTimer;
    logger = new Logger();

    scheduledStopServer(timeSec, server){
        if(Number.isInteger(timeSec)) {
            let time = Number.parseInt(timeSec) * SECOND;
            this.logger.stoppingServer(time);

            this.sdTimer = setTimeout(() => {
                process.stdin.unref();
                server.close();
            }, time);
        }
        else {
            this.logger.cancelStopping();
            clearTimeout(this.sdTimer);
        }
    }

    periodicCommit(timeSec){
        let time = Number.parseInt(timeSec) * SECOND;

        if(Number.isInteger(timeSec)) {
            this.logger.startCommit(time);
            this.scTimer = setInterval(() => {
                db.commit(this);
            }, time).unref();
        }
        else{
            this.logger.stopCommit();
            clearInterval(this.scTimer);
        }
    }

    collectingStatistics(timeSec){
        let time = Number.parseInt(timeSec) * SECOND;

        if(Number.isInteger(timeSec)) {
            this.dateRun = new Date();
            this.logger.startStatistics(time);

            this.ssTimer = setTimeout(() => {
                this.logger.doneStatistics();
                this.dateStop = new Date();
            }, time).unref();

        }
        else{
            this.logger.stopStatistics();
            clearTimeout(this.ssTimer);
        }
    }

    getStatistics(){
        if(this.ssTimer === null){
            return {start: this.dateRun, request: this.requests, commit: this.commits};
        }
        else {
            return {start: this.dateRun, stop: this.dateStop, request: this.requests, commit: this.commits};
        }
    }

    incCommit(){
        this.commits ++;
    }
    incRequest(){
        this.requests++;
    }

}

class Logger{
    stoppingServer(time){
        console.log(">>> The server will be stopped after: " + time + " ms <<<\n");
    };
    cancelStopping(){
        console.log(">>> The server cancel stopped <<<\n");
    }

    startCommit(time){
        console.log(">>> Commit every : " + time + " ms <<<\n");
    }
    commit(){
        console.log(">>> COMMIT <<<\n");
    }
    stopCommit(){
        console.log(">>> Periodic commit is  stopped  <<<\n");
    }
    startStatistics(time) {
        console.log(">>> Starting the collection during : " + time + " ms <<<\n");
    }
    doneStatistics(){
        console.log(">>> Done statistics collections <<<\n");
    }
    stopStatistics() {
        console.log(">>> Stop statistics the collection <<<\n");
    }
}

module.exports = new Manager();