const { User } = require('../models');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponse } = require('../utils/apiResponse.utils');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt.utils");

module.exports = {
    register: async (req) => {
        try {
            const { name, username, email, password } = req.body;
            const hashedPassword = await hashPassword(password);

            await User.create({ name, username, email, password: hashedPassword });

            return apiResponse(status.CREATED, 'CREATED', 'Success create an account');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    login: async (req) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where: { email }});

            if (!user) throw {code: status.BAD_REQUEST, status: 'BAD_REQUEST', message: 'These credentials does not match our records'};
            if (!await comparePassword(password, user.password))
                throw {code: status.BAD_REQUEST, status: 'BAD_REQUEST', message: 'These credentials does not match our records'};

            user.password = undefined;
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            return apiResponse(status.OK, 'OK', 'Success login', { user, accessToken, refreshToken });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
};
