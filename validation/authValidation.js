const Joi = require('joi');

const signUpValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email().required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cpassword: Joi.valid(Joi.ref('password')).required().messages({
            "any.only": "passwords doesn't match"
        }),
        age: Joi.number().required().min(16),
        gender: Joi.string().min(4).max(6)
    })
}

const signInValidation = {
    body: Joi.object().required().keys({
        email: Joi.string()
            .email().required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
}

const ResetPasswordValidation = {
    body: Joi.object().required().keys({
        code: Joi.string().required(),
        newPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        cpassword: Joi.valid(Joi.ref('newPassword')).required().messages({
            "any.only": "passwords doesn't match"
        }),
    })
}

module.exports = {
    signUpValidation,
    signInValidation,
    ResetPasswordValidation
}