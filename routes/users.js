var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');
var Role = require('mongoose').model('Role');
var passport = require('passport');
var controller = require('../controller/userController.js');

var secret = "oogVerblindenMooi";

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}).populate('role').exec(function(err, users){
		if (err){ return next(err); }
		res.json(users);
	});
});

router.get('/addtest', function(req, res, next) {
	var TestAdmin = new Role({
		name: "TestAdmin"
	});

	TestAdmin.save(function(err){
		//if (err) return handleError(err);

		var Admin = new User({
			username: "Admin",
			password: "test1235",
			active: true,
			email: "info@bartimeus.nl",
			role: TestAdmin._id
		});

		Admin.save(function(err){
			if (err) res.send(err + " An error occured"); 
			else //return handleError(err);
				res.send("Saved user");
		})
	});

});

/*router.get('/', function(req, res, next) { 
  User.find().exec(function(e, users){
  	//res.render('users/index', {
  		if (e){ return next(e); }
  		res.json(users);
  		//"users" : docs
  	//});
  });
});*/

router.post('/', function(req, res) {
	var db = req.db;

	// get the fields

	var collection = db.get('user');

	collection.insert({
		// set the fields
	}, function(err, doc) {
		if (err) {
            res.send("There was an error");
		} else {
            res.redirect("/");
		}
	})
});

//isLoggedIn midleware checkt of user ingelogd is
router.get('/profile',isLoggedIn, function(req, res, next) {
	res.json(req.user);
});


router.post('/signup', passport.authenticate('local-signup'), function (req, res) {
		res.status(201).json({'message':'account created succesful'});
	});

router.post('/login', passport.authenticate('local-login'), function(req, res) {
    controller.getToken(req.user, secret, function(response) {
        res.json(response);
    });
});



/*// route middleware to make sure user is logged in: for PASSPORT
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	var reqPath 	= req.path.split('/')[1];

	res.status(401);
	res.json({
        message: 'Not logged in'
    });

}*/

function isLoggedIn(req, res, next) {
	controller.checkToken(req, secret,next, function(response){
		res.json(response);
	});
}

module.exports = router;