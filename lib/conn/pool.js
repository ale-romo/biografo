var mysql = require('mysql2');

var POOL = mysql.createPool({
	host: 'biografoimaginario.com',
	user: 'outside',
	password: 'mtm8myk-vex8mkw*GXB',
	database: "BIOGRAFO",
	// socketPath: '/var/run/mysqld/mysqld.sock'
});

exports.POOL = POOL;