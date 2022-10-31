const AuthService = require('../services/auth.service');

module.exports = {
    register: async (req, res) => {
        try {
            const serviceResponse = await AuthService.register(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    login: async (req, res) => {
        try {
            const serviceResponse = await AuthService.login(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
