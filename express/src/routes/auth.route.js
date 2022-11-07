const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { registerValidation, loginValidation} = require('../utils/validation/authentication.validation');
const { authentication, refreshToken} = require("../middlewares/authentication.middleware");

const router = express.Router();

router.post('/login', loginValidation, AuthController.login);
router.post('/register', registerValidation, AuthController.register);
router.get('/me', authentication, AuthController.me);
router.post('/refresh-token', refreshToken, AuthController.refreshToken);

router.post('/login/google', AuthController.googleLogin);

module.exports = router;
