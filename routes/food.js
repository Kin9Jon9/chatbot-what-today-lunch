var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var dbconfig   = require('../config/database.js');
var con = mysql.createConnection(dbconfig);
var router = express.Router();

/*Post로 통신*/
router.post('/', function(req, res) {
	let url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36548&id=mjukr_051002020000";
	let baekBan;
	let ilPum;
	const result = {
		version: "2.0",
		data : {
			'menu1' : 'aa',
			'menu2' : 'bb'
		}
	};
	//비동기적인 처리로 res.send를 request 함수 내부에 포함 시켰음!! (매우 중요)
	request(url, function(error, response, body){
		
		const $ = cheerio.load(body);
		let date = new Date();
		//일요일 = 1 이므로 - 1 하여 계산
		let day = date.getDay() - 1;
		
		//맨앞 공백제거를 위한 substring(1)
		baekBan = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(1) div').text().substring(1);
		ilPum = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(2) div').text().substring(1);
		result.data['menu1'] = baekBan;
		result.data['menu2'] = ilPum;

		res.status(200).send(result);
		
	});

});

router.post('/next', function(req, res) {
	let url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36548&id=mjukr_051002020000";
	let baekBan;
	let ilPum;
	const result = {
		version: "2.0",
		data : {
			'menu1' : 'aa',
			'menu2' : 'bb'
		}
	};
	request(url, function(error, response, body){
		
		const $ = cheerio.load(body);
		let date = new Date();
		//일요일 = 1 이므로 - 1 하여 계산
		let day = date.getDay();
		
		//맨앞 공백제거를 위한 substring(1)
			baekBan = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(1) div').text().substring(1);
			ilPum = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(2) div').text().substring(1);
			result.data['menu1'] = baekBan;
			result.data['menu2'] = ilPum;

		res.status(200).send(result);
	});

});

module.exports = router;
