const Joi = require("joi");

const addCommentValidation = {
    body: Joi.object().keys({
        text: Joi.string().optional().max(30),
    }),
    params: Joi.object().keys({
        id: Joi.string().min(24).max(24).required()
    })
}

module.exports = {
    addCommentValidation,
};