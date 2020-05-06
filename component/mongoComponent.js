const {infoLog,errorLog} = require('../services/loggerService');


module.exports = {
    getDocuments : async(filters) => {
        //infoLog.info(filters);
        let query = {}
        Object.entries(filters).forEach(([key,value])=>{
            body = {["body."+key]: value};
            query = Object.assign(body,query);
        })
        //infoLog.info(query);
        return query;
    }
}