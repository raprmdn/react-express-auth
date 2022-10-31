const express = require('express');
const AuthRouter = require('./auth.route');

const router = express.Router();

router.use('/auth', AuthRouter);

module.exports = router;
