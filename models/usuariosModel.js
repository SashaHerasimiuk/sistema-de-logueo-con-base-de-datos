var pool = require('../routes/bd');
var md5 = require('md5');
// require('dotenv').config();

async function getUserByUsernameAndPassword(user, password) {
	try{
		var query = "select * from usuarios where usuario = ? and password = ? limit 1";
		var rows = await pool.query(query, [user, md5(password)]);
		return rows[0];

	} catch(error) {
		console.log(error);
		throw error;
	}
}

module.exports = { getUserByUsernameAndPassword }