var express = require('express');
var router = express.Router();

router.use('/lunch', require('./lunch/index'));
router.use('/favorite', require('./favorite/index'));

module.exports = router;
