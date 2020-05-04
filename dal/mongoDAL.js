const {infoLog,errorLog} = require('../services/loggerService'),
    mongo = require('../services/mongodbService');


class mongoDal {
    constructor(){
        this.mongoClient = new mongo ();
    }
    async addDocument(doc){
        try {
            const db = await this.mongoClient.connect();
            
            if(this.mongoClient.isConnected()) {
                try{
                
                    //infoLog.info(db);
                    const r = await db.collection(doc.collection).insertOne({
                        "name" : doc.body.name,
                        "age" : doc.body.age,
                        "grade" : doc.body.grade
                    });
                    if(r.insertedCount != 1){
                        errorLog.error("tried to insert more then one document: "+ r);
                        errorLog.error(doc);
                        return {success : false, count : r.insertedCount}
                    }
                    else {
                        infoLog.info("successfully inserted document");
                        return {success : true, body : doc};
                    }
                }
                catch (error) {
                    errorLog.error("error while inserting document: "+error);
                    errorLog.error(doc);
                return {success : false, body : error};
                }
            }
            else {
                errorLog.error("unable to connect to mongodb database");
                return {success : false, body : "somthing went wrong"}
            }
        } catch (error) {
            errorLog.error("somthing went wrong "+error);
            return {success : false, body : "somthing went wrong"};
        }
        finally {
            await this.mongoClient.disconect();
            delete this.mongoClient
        }

    }

}

module.exports = mongoDal;