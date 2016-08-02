var mysql = require('mysql');
var con = mysql.createConnection({
	host: "46.101.33.110",
	user     : 'pubstaging',
	password : 'pYRArKRwms4qAVED',
	database : 'pubstaging'
});


con.connect(function(err){
	if(err){
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection established');
});

var user = {fname: "zzzzzoooom", lname: "errrrr", username: "findme", email: Date.now()};
con.query("INSERT INTO users SET ?", user, function(err,res){
	if(err) throw err;
	console.log("Last inser ID:", res.insertId);
});

con.query("SELECT * FROM users WHERE username = 'findme'", function(err, rows, fields) {
	if (err) throw err;
 	console.log('The solution is: ', rows[0].fname+" "+rows[0].lname);
});

con.end(function(err){

});