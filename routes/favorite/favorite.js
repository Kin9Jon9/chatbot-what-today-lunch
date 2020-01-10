var express = require('express');
var mysql = require('mysql');
var dbconfig   = require('../../config/database');
var userCheck = require('../../modules/userCheck');
var con = mysql.createConnection(dbconfig);
var router = express.Router();

// get favorite Keyword
router.post('/set',async function (req,res){
	
	//유저 식별키를 받아옴
	const user = req.body.userRequest.user.properties.plusfriendUserKey;
	
	//유저 존재 여부 확인
	const type =! await userCheck.check(user);
	
	//유저가 존재 하지 않을경우 유저 추가.
	if(type) await userCheck.add(user);
	else console.log('유저키가 있어서 추가하지 않았습니다.');
	
	
	const result = {
		version : '2.0',
		data : '데이터가 추가 되었습니다!'
	}
	
	res.status(200).send(result);
	
});

//delete favorite Keyword
router.post('/del',(req, res)=>{
	res.send('0');
});

module.exports = router;