const express = require('express');
const router = express.Router();

const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');
const auth = require('../controllers/auth.controller');

router.route('/register').post(imageUpload.single('avatar'), auth.register);      // single is middleware to handle data and signle file | avatar indicate field with file

router.route('/login').post(auth.login);

router.route('/logout').delete(authMiddleware, auth.logout);

router.route('/user').get(authMiddleware, auth.getUser);


module.exports = router;