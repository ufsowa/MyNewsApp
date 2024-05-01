const express = require('express');
const router = express.Router();

const authMiddleware = require('../utils/authMiddleware');
const Controller = require('../controllers/auth.controller');

router.route('/register').post(Controller.register);

router.route('/login').post(Controller.login);

router.route('/logout').delete(authMiddleware, Controller.logout);

router.route('/user').get(authMiddleware, Controller.getUser);


module.exports = router;