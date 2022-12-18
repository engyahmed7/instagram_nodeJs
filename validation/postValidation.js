const Joi = require("joi");

const addPostValidation = {
    body: Joi.object().keys({
        text: Joi.string().optional().max(30),
    })
}
const LikePostValidation = {
    params: Joi.object().keys({
        id: Joi.string().min(24).max(24).required()
    })
}

module.exports = {
    addPostValidation,
    LikePostValidation
};