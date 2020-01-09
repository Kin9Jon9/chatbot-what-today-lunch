var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var crawling = require('../../crawling/crawling')
var dbconfig   = require('../../config/database');
var con = mysql.createConnection(dbconfig);
var router = express.Router();

// 학생회관
router.get('/student', function(req, res) {
	crawling.getStudentMenu().then(result =>{
		res.send(result);	
	})
});

//명진당
router.get('/dding', function(req, res) {
	crawling.getDdingMenu().then(result =>{
		res.send(result);	
	})
});

//자율 한식
router.get('/free', function(req, res) {
	crawling.getFreeMenu().then(result =>{
		res.send(result);	
	})
});

module.exports = router;
