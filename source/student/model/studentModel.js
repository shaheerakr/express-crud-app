const joi = require('@hapi/joi');

module.exports = {
    addStudent : joi.object({
        name : joi.string()
            .regex(new RegExp('^[a-zA-Z ]*$'))
            .min(3)
            .max(30)
            .required(),
        age : joi.number()
            .required(),
        grade : joi.number()
            .max(10)
            .min(1)
            .required()
    }).strict(),
    getStudent : joi.object({
        filters : {
            name : joi.string()
                .regex(new RegExp('^[a-zA-Z ]*$'))
                .min(3)
                .max(30),
            age : joi.number(),
            grade : joi.number()
                .max(10)
                .min(1)
        },
        skip : joi.number()
            .required(),
        limit : joi.number()
            .required()
    }).strict()
}
