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
			let day = (new Date().getDay());

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
			let day = (new Date().getDay());
			
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
			let day = (new Date().getDay());
			
			result.data.menu1 = $('body tr:nth-child(10) table:nth-child('+day+') tbody tr:nth-child(1) div').text().replace(/\n/gi,' ');
			result.data.menu1Next = $('body tr:nth-child(10) table:nth-child('+(day+1)+') tbody tr:nth-child(1) div').text().replace(/\n/gi,' ');
			for(key in result.data) if(result.data[key] == '') result.data[key] = '메뉴가 없습니다.'

			resolve(result);
		});
	})
};

//전체 메뉴 크롤링
exports.getAllMenu = function(){

	return new Promise(async resolve =>{
		
		//전체 메뉴를 담을 배열.
		result = [];
		const student = await exports.getStudentMenu();
		const myoungjin = await exports.getDdingMenu();
		const freeKorean = await exports.getFreeMenu();

		for(i in student.data){
			switch(i){
				case 'menu1' :
					result.push('오늘 백반 : '+student.data[i]);
					break;
				case 'menu2' :
					result.push('오늘 일품 : '+student.data[i]);
					break;
				case 'menu3' :
					result.push('오늘 양식 : '+student.data[i]);
					break;
				case 'menu1Next' :
					result.push('내일 백반 : '+student.data[i]);
					break;
				case 'menu2Next' :
					result.push('내일 일품 : '+student.data[i]);
					break;
				case 'menu3Next' :
					result.push('내일 양식 : '+student.data[i]);
					break;
				default :
					break;
			}
		}
		for(i in myoungjin.data){
			switch(i){
				case 'menu1' :
					result.push('오늘 가스야 : '+myoungjin.data[i]);
					break;
				case 'menu2' :
					result.push('오늘 덮고복고 : '+myoungjin.data[i]);
					break;
				case 'menu1Next' :
					result.push('내일 가스야 : '+myoungjin.data[i]);
					break;
				case 'menu2Next' :
					result.push('내일 덮고복고 : '+myoungjin.data[i]);
					break;
				default :
					break;
			}
		}
		for(i in freeKorean.data){
			switch(i){
				case 'menu1' :
					result.push('오늘 자율한식 : '+freeKorean.data[i]);
					break;
				case 'menu1Next' :
					result.push('내일 자율한식 : '+freeKorean.data[i]);
					break;
				default :
					break;
			}
		}
		//전체 메뉴 반환
		resolve(result);
	});
};
