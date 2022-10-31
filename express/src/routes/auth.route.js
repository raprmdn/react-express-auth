const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { registerValidation } = require('../utils/validation/authentication.validation');

const router = express.Router();

router.post('/register', registerValidation, AuthController.register);

module.exports = router;
