var mysql = require('mysql');
var dbconfig   = require('../config/database.js');
var con = mysql.createConnection(dbconfig);

//유저 존재 여부 확인 쿼리
exports.check = function(key){
	
	return new Promise(resolve =>{
		
		const sql = `SELECT EXISTS (SELECT * FROM user WHERE userkey = '${key}') AS success`;
		
		//유저가 존재하면 1, 존재 하지 않는다면 0 반환
		con.query(sql,(err,result)=>{
			if(err) throw err;
			resolve(result[0].success)
		});
	});	
};

//유저 식별 키 추가 쿼리
exports.add = function(key){
	return new Promise(resolve =>{
		
		const sql = `INSERT INTO user (userkey) VALUES ('${key}')`
		
		con.query(sql,(err,result)=>{
			if(err) throw err;
			console.log('유저 정보가 성공적으로 입력 되었습니다. index :', result.insertId);
		})
	})
}