const {infoLog,errorLog} = require('../../../services/loggerService'),
    mongoUtil = require('../../../dal/mongoDAL'),
    genralMethods = require('../../../common/genralMethods'),
    mongoComponent = require('../../../component/mongoComponent');

//modal
const studentModel = require('../model/studentModel') 




class studentController{
    constructor(){
        this.name = 'student'
        this.mongo = null;
    }
    async addStudent(req,res){
        try {
            this.mongo = new mongoUtil()
            let isValid = await genralMethods.validateReqBody(req.body,studentModel.addStudent);
            if(isValid.valid === true){
                infoLog.info("reqest body is valid",req.body)
                let doc = {
                    collection : "student",
                    body : req.body 
                }
                const result = await this.mongo.addDocument(doc);
                infoLog.info(result);
                if(result.success){
                    return res.json(result);
                }
                else{
                    return res.status(400).json(result);
                }
            }
            else{
                errorLog.error("reqest body is invalid",isValid.error);
                return res.status(400).json({
                    success: isValid.valid,
                    error : isValid.error,
                });
            }   
        } catch (error) {
            errorLog.error("somthing went wrong "+error);
            return res.status(500).send("somthing went wrong");
        }
    }
    async getStudent(req,res){
        try {
            this.mongo = new mongoUtil()
            let isValid = await genralMethods.validateReqBody(req.body,studentModel.getStudent);
            if(isValid.valid === true){
                infoLog.info("reqest body is valid",req.body)
                let query = await mongoComponent.getDocuments(req.body.filters);
                infoLog.info(query);
                let doc = {
                    collection : "student",
                    body : query,
                    skip : req.body.skip,
                    limit : req.body.limit
                }
                const result = await this.mongo.getDocument(doc);
                return res.json(result);
            }
            else{
                errorLog.error("reqest body is invalid",isValid.error);
                return res.status(400).json({
                    success: isValid.valid,
                    error : isValid.error,
                });
            }   
        } catch (error) {
            errorLog.error("somthing went wrong "+error);
            return res.status(500).send("somthing went wrong");
        }
    }
}

module.exports = studentController;