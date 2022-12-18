const Joi = require('joi');

const getDetails = {
    headers: Joi.object().required().keys({
        authorization: Joi.string().required()
    }).options({
        allowUnknown: true
    })
}

const updatePasswordValidation = {
    body: Joi.object().required().keys({
        oldPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        newPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        cpassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
            "any.only": "passwords doesn't match"
        }),
    })
}

module.exports = {
    getDetails,
    updatePasswordValidation
}