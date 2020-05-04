const config = require('../config/config.json'),
    mongo = require('mongodb'),
    {infoLog,errorLog} = require('./loggerService');

class mongoInstance{
    constructor(){
        this.client = new mongo.MongoClient(
            'mongodb://'+config.mongodb.host+':'+config.mongodb.port
        );
        this.db = null;
    }
    async connect(){
        try {
            await this.client.connect()
            if (this.client.isConnected()) {
                infoLog.info("successfully conected to mongodb cluster...");
            }
            else {
                errorLog.error("mongodb cluster is down...");
            }
            this.db = await this.client.db(config.mongodb.dbname);
            return this.db 

        } catch (error) {
            errorLog.error("mongodb cluster is down... "+ error);
        }
    }
    async isConnected(){
        return this.client.isConnected();
    }
    async disconect(){
        infoLog.info("disconected with mongodb cluster...")
        await this.client.close();
    }
}


module.exports = mongoInstance;