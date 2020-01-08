
var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var dbconfig   = require('../config/database.js');
var con = mysql.createConnection(dbconfig);
var router = express.Router();

/*Post로 통신*/
router.get('/', function(req, res) {

  con.query('SELECT * from Person', function(err, rows) {
    if(err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows);
  });


});

module.exports = router;
