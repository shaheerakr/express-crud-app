

module.exports = {
    validateReqBody : async (body,schema) => {
        try{
            const {error,value} = await schema.validate(body)
            if(error === undefined){
                return {valid: true};
            }
            else{
                return {valid : false, error, value};
            }
        } catch(error){
            return {valid : false, error};
        }
    }
}