var express = require('express');
var router = express.Router();

/* GET RESTful API listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a api list');
});

module.exports = router;
