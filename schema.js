const Joi = require("joi");

const cafeSchema = Joi.object({
    category: Joi.string().trim().min(1).required(),
    targetName: Joi.string().trim().min(1).required(),
    student: Joi.string().trim().min(1).required(),
    department: Joi.string().trim().min(1).required(),
    feedback: Joi.string().trim().min(1).required(),
    rating: Joi.number().min(0).max(5).required()
}).unknown(true);