const { StatusCodes: status } = require('http-status-codes');
const { apiResponse } = require('../utils/apiResponse.utils');
const { verifyAccessToken, verifyRefreshToken } = require("../utils/jwt.utils");

module.exports = {
    authentication: (req, res, next) => {
        try {
            const bearer = req.headers.authorization;
            if (!bearer) throw apiResponse(status.UNAUTHORIZED, 'UNAUTHORIZED', 'Unauthorized. Please login to continue.');

            const token = bearer.split(' ')[1];
            if (!token) throw apiResponse(status.UNAUTHORIZED, 'UNAUTHORIZED', 'Unauthorized. Please login to continue.');

            req.user = verifyAccessToken(token);

            next();
        } catch (e) {
            if (e.name === 'JsonWebTokenError') {
                return res.status(status.UNAUTHORIZED).json(
                    apiResponse(status.UNAUTHORIZED, 'UNAUTHORIZED', 'Invalid token. Please login again.')
                );
            }
            if (e.name === 'TokenExpiredError') {
                return res.status(status.UNAUTHORIZED).json(
                    apiResponse(status.UNAUTHORIZED, 'UNAUTHORIZED', 'Token expired. Please login again.')
                );
            }

            return res.status(e.code).json(e);
        }
    },
    refreshToken: (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw apiResponse(status.BAD_REQUEST, 'BAD_REQUEST', 'Refresh token is required');

            req.user = verifyRefreshToken(refreshToken);

            next();
        } catch (e) {
            if (e.name === 'JsonWebTokenError') {
                return res.status(status.UNAUTHORIZED).json(
                    apiResponse(status.UNAUTHORIZED, 'UNAUTHORIZED', 'Invalid refresh token. Please login again.')
                );
            }
            if (e.name === 'TokenExpiredError') {
                return res.status(status.UNAUTHORIZED).json(
                    apiResponse(status.UNAUTHORIZED, 'UNAUTHORIZED', 'Refresh token expired. Please login again.')
                );
            }

            return res.status(e.code).json(e);
        }
    }
};
