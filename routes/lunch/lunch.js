var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var dbconfig   = require('../../config/database.js');
var con = mysql.createConnection(dbconfig);
var router = express.Router();

// 학생회관
router.get('/student', function(req, res) {
	const url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36548&id=mjukr_051002020000";

	const result = {
		version: "2.0",
		data : {}
	};
	
	//비동기적인 처리로 res.send를 request 함수 내부에 포함 시킴.
	request(url, function(error, response, body){
		
		const $ = cheerio.load(body);
		let day = new Date().getDay();
		
		//맨앞 공백제거를 위한 substring(1)
		result.data.menu1 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(1) div').text().substring(1);
		result.data.menu2 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(2) div').text().substring(1);
		result.data.menu3 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(3) div').text().substring(1);
		result.data.menu1Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(1) div').text().substring(1);
		result.data.menu2Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(2) div').text().substring(1);
		result.data.menu3Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(3) div').text().substring(1);
	
		//크롤링 결과값이 존재 하지 않을 경우, '메뉴가 없습니다' 할당.
		for(key in result.data) if(result.data[key] == '') result.data[key] = '메뉴가 없습니다.'
		
		console.log(result);
		
		
		res.status(200).send(result);
		
	});

});

//명진당
router.get('/dding', function(req, res) {
	const url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36337&id=mjukr_051002050000";
	const result = {
		version: "2.0",
		data : {}
	};
	//비동기적인 처리로 res.send를 request 함수 내부에 포함 시킴.
	request(url, function(error, response, body){
		
		const $ = cheerio.load(body);
		
		let day = new Date().getDay();

		result.data.menu1 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(3) div').text().replace('\n', ' / ');
		result.data.menu2 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(4) div').text().replace('\n', ' / ');
		result.data.menu1Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(3) div').text().replace('\n', ' / ');
		result.data.menu2Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(4) div').text().replace('\n', ' / ');
		for(key in result.data) if(result.data[key] == '') result.data[key] = '메뉴가 없습니다.'
		
		console.log(result);
		res.status(200).send(result);
		
	});

});

//자율 한식

router.get('/free', function(req, res) {
	const url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36337&id=mjukr_051002050000";
	const result = {
		version: "2.0",
		data : {}
	};
	
	//비동기적인 처리로 res.send를 request 함수 내부에 포함 시킴.
	request(url, function(error, response, body){
		
		const $ = cheerio.load(body);
		
		let day = new Date().getDay();

		result.data.menu1 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(1) div').text().replace(/\n/gi,' ');
		result.data.menu1Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(1) div').text().replace(/\n/gi,' ');
		for(key in result.data) if(result.data[key] == '') result.data[key] = '메뉴가 없습니다.'
		
		console.log(result);
		res.status(200).send(result);
		
	});

});

module.exports = router;
