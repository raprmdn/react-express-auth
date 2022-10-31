const { User } = require('../models');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponse } = require('../utils/apiResponse.utils');
const { hashPassword } = require('../utils/bcrypt.utils');

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
};
