const { User } = require('../models');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponse } = require('../utils/apiResponse.utils');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken} = require("../utils/jwt.utils");

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
            const userModel = await User.findOne({where: { email }});

            if (!userModel) throw apiResponse(status.BAD_REQUEST, 'BAD_REQUEST', 'These credentials does not match our records');
            if (!await comparePassword(password, userModel.password))
                throw apiResponse(status.BAD_REQUEST, 'BAD_REQUEST', 'These credentials does not match our records');

            const user = {
                id: userModel.id,
                name: userModel.name,
                username: userModel.username,
                email: userModel.email,
            };
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            return apiResponse(status.OK, 'OK', 'Success login', { user, accessToken, refreshToken });
        } catch (e) {
            console.log(e);
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    me: async (req) => {
        try {
            const { id } = req.user;
            const user = await User.findByPk(id);
            if (!user) throw apiResponse(status.NOT_FOUND, 'NOT_FOUND', 'User not found');
            user.password = undefined;

            return apiResponse(status.OK, 'OK', 'Success get user', { user });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    refreshToken: async (req) => {
        try {
            const { id } = req.user;
            const user = await User.findByPk(id);
            if (!user) throw apiResponse(status.NOT_FOUND, 'NOT_FOUND', 'User not found');

            const accessToken = generateAccessToken(user);

            return apiResponse(status.OK, 'OK', 'Success generate access token', { accessToken });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
