var express = require('express');
var mysql = require('mysql');
var dbconfig   = require('../../config/database');
var userCheck = require('../../modules/userCheck');
var foodAPI = require('../../modules/foodAPI');
var con = mysql.createConnection(dbconfig);
var router = express.Router();

// get favorite Keyword
router.post('/set',async (req,res)=>{
	
	//유저 식별키를 받아옴
	const user = req.body.userRequest.user.properties.plusfriendUserKey;
	//유저 발화문을 받아옴
	const PreferedFood = req.body.action.params.sys_text;
	
	//유저 발화문 출력
	console.log(PreferedFood);
	
	//const type =! await... 왜 안돼?
	
 	//유저 존재 여부 확인
 	const type = await userCheck.check(user);
	
 	//유저가 존재 하지 않을경우 유저 추가.
	if(!type) await userCheck.add(user);
	
 	console.log('데이터 추가중 ...');
 	//유저가 입력한 음식을 DB에 저장
 	const temp = await foodAPI.add(user, PreferedFood);
	const result = {
		version : '2.0',
		data : '데이터가 추가 되었습니다!',
		data2 : temp
	}
	
	res.send(result);
	
});

//delete favorite Keyword
router.post('/del', async (req, res)=>{
	
	//유저 식별키를 받아옴
	const user = req.body.userRequest.user.properties.plusfriendUserKey;
	//유저 발화문을 받아옴
	const PreferedFood = req.body.action.params.sys_text;
	
	//유저 발화문 출력
	console.log(PreferedFood);
	
	console.log('데이터를 삭제합니다.');
	const temp = await foodAPI.delete(user, PreferedFood);
	
	const result = {
		version : '2.0',
		data : '데이터가 삭제 되었습니다!',
		data2 : temp
	}
	
	res.send(result);
});

module.exports = router;