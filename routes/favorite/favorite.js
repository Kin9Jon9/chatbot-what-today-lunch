var express = require('express');
var mysql = require('mysql');
var dbconfig   = require('../../config/database');
var userCheck = require('../../modules/userCheck');
var foodDb = require('../../modules/foodDb');
var con = mysql.createConnection(dbconfig);
var router = express.Router();

// get favorite Keyword
router.post('/set',async function (req,res){
	
	//유저 식별키를 받아옴
	const user = req.body.userRequest.user.properties.plusfriendUserKey;
	//유저 발화문을 받아옴
	const PreferedFood = req.body.userRequest.utterance;
	
	//유저 존재 여부 확인
	const type =! await userCheck.check(user);
	
	//유저가 존재 하지 않을경우 유저 추가.
	if(type) await userCheck.add(user);
	else console.log('유저키가 있어서 추가하지 않았습니다.');
	
	
	console.log('데이터 추가중 ...');
	//유저가 입력한 음식을 DB에 저장
	await foodDb.add(PreferedFood);
		
	console.log(PreferedFood)
	
	const result = {
		version : '2.0',
		data : '데이터가 추가 되었습니다!'
	}
	
	res.status(200).send(result);
	
});

//delete favorite Keyword
router.post('/del', async (req, res)=>{
	
	//유저 식별키를 받아옴
	const user = req.body.userRequest.user.properties.plusfriendUserKey;
	//유저 발화문을 받아옴
	const PreferedFood = req.body.userRequest.utterance;
	
	console.log('데이터를 삭제합니다.');
	await foodDb.delete(PreferedFood);
	
	const result = {
		version : '2.0',
		data : '데이터가 삭제 되었습니다!'
	}
	
	res.status(200).send(result);
});

module.exports = router;