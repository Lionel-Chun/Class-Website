var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
}).get('/add', function (req, res, next) {
  res.send('this is to handle /users/add');
}).get('/json', function(req, res, next) {
  res.json({monday:"bread", tuesday:"sandwich"});
}).get('/testPara', function(req, res, next) {
  for (let q in req.query)
    console.log(q + " is " + req.query[q]);
    //console.log("a:", req.query.a, "b:", req.query.b);
    res.send("Done!");
});

module.exports = router;
