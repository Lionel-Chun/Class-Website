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
  //console.log("a:", req.query.a, "b:", req.query.b);
  http://localhost:3000/users/testPara?a=100&b=xyz&a=300
  for (let q in req.query) {
    // console.log(q + " is " + req.query[q]);
    console.log(q + " is " , req.query[q]);
  }
  //console.log(Object.values(req.query));
  res.send("Done!");
}).get('/testPara/:a/:b', function(req, res, next) {
  console.log("a:", req.params.a, "b:", req.params.b);
  res.send("Done!");
}).post('/testForm', function(req, res, next) {
  for(let para in req.body) {
    console.log(req.body[para]);
  }
  res.send("username:" + req.body.username + ", password:" + req.body.password);
});

module.exports = router;