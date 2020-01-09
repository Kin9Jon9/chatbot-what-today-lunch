var express = require('express');
var router = express.Router();

router.use('/', require('./favorite'));

module.exports = router;