var request = require('request');
var cheerio = require('cheerio');

//학생회관 오늘, 내일 학식 크롤링
exports.getStudentMenu = function(){

	return new Promise(resolve =>{
		
		const url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36548&id=mjukr_051002020000";
		const result = {
			version: "2.0",
			data : {}
		};
		//비동기적인 과정으로 인해 resolve를 request 안에 포함
		request(url, function(error, response, body){

			const $ = cheerio.load(body);
			let day = (new Date().getDay()) + 1;

			//맨앞 공백제거를 위한 substring(1)
			result.data.menu1 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(1) div').text().substring(1);
			result.data.menu2 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(2) div').text().substring(1);
			result.data.menu3 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(3) div').text().substring(1);
			result.data.menu1Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(1) div').text().substring(1);
			result.data.menu2Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(2) div').text().substring(1);
			result.data.menu3Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(3) div').text().substring(1);

			//크롤링 결과값이 존재 하지 않을 경우, '메뉴가 없습니다' 할당.
			for(key in result.data) if(result.data[key] == '') result.data[key] = '메뉴가 없습니다.'
			resolve(result);
		});
	})
};

//명진당 오늘, 내일 학식 크롤링 (1 : 가스야, 2: 덮고볶고)
exports.getDdingMenu = function(){

	return new Promise(resolve =>{
		
		const url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36337&id=mjukr_051002050000";
		const result = {
			version: "2.0",
			data : {}
		};
		
		request(url, function(error, response, body){

			const $ = cheerio.load(body);
			let day = (new Date().getDay()) + 1;
			
			result.data.menu1 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(3) div').text().replace('\n', ' / ');
			result.data.menu2 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(4) div').text().replace('\n', ' / ');
			result.data.menu1Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(3) div').text().replace('\n', ' / ');
			result.data.menu2Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(4) div').text().replace('\n', ' / ');
			for(key in result.data) if(result.data[key] == '') result.data[key] = '메뉴가 없습니다.'

			resolve(result);

		});
	});
};

//자율한식 오늘, 내일 학식 크롤링
exports.getFreeMenu = function(){

	return new Promise(resolve =>{
		
		const url = "http://www.mju.ac.kr/mbs/mjukr/jsp/restaurant/restaurant.jsp?configIdx=36337&id=mjukr_051002050000";
		const result = {
			version: "2.0",
			data : {}
		};

		request(url, function(error, response, body){

			const $ = cheerio.load(body);
			let day = (new Date().getDay()) + 1;
			
			result.data.menu1 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(1) div').text().replace(/\n/gi,' ');
			result.data.menu1Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(1) div').text().replace(/\n/gi,' ');
			for(key in result.data) if(result.data[key] == '') result.data[key] = '메뉴가 없습니다.'

			resolve(result);
		});
	})
};