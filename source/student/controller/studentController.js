const {infoLog,errorLog} = require('../../../services/loggerService'),
    mongoUtil = require('../../../dal/mongoDAL');




class studentController{
    constructor(){
        this.name = 'student'
        this.mongo = null;
    }
    async addStudent(req,res){
        try {
            this.mongo = new mongoUtil()
            infoLog.info(req.body);
            let doc = {
                collection : "student",
                body : req.body 
            }
            const result = await this.mongo.addDocument(doc);
            infoLog.info(result);
            if(result.success){
                res.json(result);
            }
            else{
                res.json(result);
            }   
        } catch (error) {
            errorLog.error("somthing went wrong "+error);
            res.status(404).send("somthing went wrong");
        }
    }
    async getStudent(req,res){
        infoLog.info("hit on get student");
        await res.json({"res": "ok"})
    }
}

module.exports = studentController;