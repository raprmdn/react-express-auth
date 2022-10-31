const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponseValidationError } = require('../../utils/apiResponse.utils');
const { isUsernameExistsJoi, isEmailExistsJoi } = require('../../helpers/exists.helper');

const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
};

module.exports = {
    registerValidation: async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().max(255).required().label('Name'),
            username: Joi.string().max(255).required().label('Username')
                .external(async (username) => isUsernameExistsJoi(username)),
            email: Joi.string().email().max(255).required()
                .label('Email')
                .external(async (email) => isEmailExistsJoi(email)),
            password: passwordComplexity().required().label('Password'),
            password_confirmation: Joi.any().valid(Joi.ref('password')).required().label('Password Confirmation')
                .options({ messages: { 'any.only': 'Password and {{#label}} does not match' } }),
        });

        try {
            await schema.validateAsync(req.body, options);
            next();
        } catch (e) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(e));
        }
    },
    loginValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().max(255).required()
                .label('Email'),
            password: Joi.string().required().label('Password'),
        });

        const { error } = schema.validate(req.body, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
};
