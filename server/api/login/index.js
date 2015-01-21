'use strict';

var express = require('express');
var controller = require('./login.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.check);

module.exports = router;
