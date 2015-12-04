var express = require('express');
var router = express.Router();
passport = require('passport'),
mongoose = require('mongoose');
OfficialList = mongoose.model('OfficialList');
User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'A Semi-Comprehensive List of Little Mermaid Adaptations' });
});
router.get('/about', function(req, res) {
	res.render('about', {title: 'About The Little Mermaid'});
});

router.get('/littleMermaid/adaptations', function(req, res) {
	var OfficialList2 = OfficialList.find({}, function(err, adaptations, count) {
		res.render('adaptations', {adaptations: adaptations, title: 'List of Adaptations'});
	});
	
});

router.get('/littleMermaid/adaptations/search', function(req,res) {
	
	res.render('search',{title: 'Search by Country', user: req.user, admin: req.user.username=="admin"});
	
	
});

router.get('/searchQuery', function(req, res, next) {
  var OfficialList3 = OfficialList.find({}, function(err, adaptations, count) {
    res.json(adaptations.map(function(a) {
      return {
      'name': a.name,
  		'screenWriter': a.screenWriter,
  		'director': a.director,
  		'company': a.company,
  		'country': a.country,
  		'year': a.year,
  		'link': a.link
      }; 
    })); 
  });
});

router.get('/permissionDenied', function(req, res) {
	res.render('permissionDenied', {title: 'Permission Denied'});
});


module.exports = router;
