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
    connect = async (callback) =>{
        try {
            await this.client.connect( (err,client) => {
                if(err){
                    errorLog.error("error while connecting to mongodb cluster: "+err);
                    throw err;
                }
                this.db = client.db(config.mongodb.dbname);
                if(this.client.isConnected()){
                    infoLog.info("successfully conected to mongodb cluster...");
                }
                else{
                    errorLog.error("mongodb cluster is down...");
                }
                return callback(err,this.db);
            });

        } catch (error) {
            errorLog.error("mongodb cluster is down... "+ error);
        }
    }
    disconect = async () =>{
        this.client.close()
    }
}


module.exports = mongoInstance;