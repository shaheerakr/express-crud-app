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
                        body : doc.body
                    });
                    if(r.result.ok === 1){
                        infoLog.info("successfully inserted document ");
                        return {success : true, body : doc.body};
                    }
                    else if(r.insertedCount !== 1){
                        errorLog.error("tried to insert more then one document: ", r);
                        errorLog.error(doc);
                        return {success : false, count : r.insertedCount}
                    }
                    else{
                        errorLog.error("error while inserting document: ",r);
                        return {success : false, body : r.result}    
                    }
                }
                catch (error) {
                    errorLog.error("error while inserting document: ",error);
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
        } finally {
            await this.mongoClient.disconect();
            delete this.mongoClient
        }
    }
    async getDocument (query) {
        try {
            const db = await this.mongoClient.connect();
            
            if(this.mongoClient.isConnected()) {
                try{
                    const r = await db.collection(query.collection).find(query.body).skip(query.skip).limit(query.limit).toArray()
                    infoLog.info(r);
                    return {success: true, body : r};
                }
                catch (error) {
                    errorLog.error("error while getting documents: ",error);
                    errorLog.error(query);
                    return {success : false, body : error};
                }
            }
        } catch (error) {
            errorLog.error("somthing went wrong "+error);
            return {success : false, body : "somthing went wrong"};
        } finally {
            await this.mongoClient.disconect();
            delete this.mongoClient
        }
    }
}

module.exports = mongoDal;