const express = require('express');
const router = express.Router();

const imageUpload = require('../utils/imageUpload');
const Controller = require('../controllers/ads.controller');

router.route('/').get(Controller.getAll);

router.route('/random').get(Controller.getRandom);

router.route('/:id').get(Controller.getById);

router.route('/').post(imageUpload.single('image'), Controller.addItem);

router.route('/:id').put(imageUpload.single('image'), Controller.updateItem);

router.route('/:id').delete(Controller.deleteItem);

module.exports = router;