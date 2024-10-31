var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', cnt: 3 });
});

router.get('/frontEnd', function (req, res, next) {
  res.render('fe', { title: 'Express', cnt: 5});
});

// router.get('/form1', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/form1.html'));
// })

module.exports = router;
