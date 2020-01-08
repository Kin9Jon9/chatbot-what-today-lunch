var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	port : '3306',
	database : 'meal'
});

connection.connect();

connection.query('SELECT * FROM Person', function(err, rows, fields){
	if(!err)
		console.log('The solution is :', rows);
	else
		console.log('Error while performing Query.', err);
});

connection.end();

