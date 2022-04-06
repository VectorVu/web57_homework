const Joi = require("joi");

const createPostSchema = Joi.object({
    title: Joi.string()
        .min(6)
        .max(100)
        .required(),
    content: Joi.string()
        .min(100)
        .max(200)
        .required(),
    imageUrl: Joi.string()
        .pattern(new RegExp('^http'))
        .required()
})
const updataPostSchema = Joi.object({
    title: Joi.string()
        .min(6)
        .max(100),
    content: Joi.string()
        .min(100)
        .max(200),
    imageUrl: Joi.string()
})
module.exports = {
    createPostSchema,
    updataPostSchema
}