var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function (req, res, next) {
  res.send('this is to handle /users/add');
});

router.get('/json', function(req, res, next) {
  res.json({monday:"bread", tuesday:"sandwich"});
});

module.exports = router;
