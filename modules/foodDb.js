var mysql = require('mysql');
var dbconfig   = require('../config/database.js');
var con = mysql.createConnection(dbconfig);

//중복 여부 확인
exports.checkDuplication = (userPreferFood) =>{
	return new Promise(resolve =>{
		//중복 확인. 존재 할 경우 : 1 || 없을 경우 : 0 
		const sql = `SELECT EXISTS (SELECT * FROM menu WHERE food = '${userPreferFood}') AS success`;
		
		con.query(sql, (err, result)=>{
			
			if(err) throw err;
			resolve(result[0].success);
		});
	});
};

//선호 메뉴 추가
exports.add = (userPreferFood)=>{
	return new Promise(async resolve =>{
		
		//https://jsdev.kr/t/module-exports/3341 참고하길.
		isDataDuplication =! await exports.checkDuplication(userPreferFood);
		
		const sql = `INSERT INTO menu (food) VALUES ('${userPreferFood}')`
		
		if(isDataDuplication){
			
			const sql = `INSERT INTO menu (food) VALUES ('${userPreferFood}')`
			
			con.query(sql, (err, result)=>{
				if(err) throw err;
				console.log('유저가 입력한 음식을 추가 하였습니다.');
			});
		};
		console.log('아이템이 이미 존재하여 추가하지 않았습니다.');
	});
};