var express = require('express');
var router = express.Router();
var Role = require('mongoose').model('Role');

/* GET users listing. */
router.get('/', function(req, res, next) {
	Role.find().populate('users parent').exec(function(err, roles){
		if (err){ return next(err); }
		res.json(roles);
	});
})

/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

module.exports = router;
