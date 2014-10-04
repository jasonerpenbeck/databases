var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat",
  host: 'localhost'
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  // write queries
  var qLang = "SELECT * FROM messages";
};

exports.findUser = function(username, cb){
  var qLang =  "SELECT user_name FROM users WHERE user_name =" + username;
};

exports.saveUser = function(username, cb){
  var qLang = "INSERT INTO users(user_name) VALUES " + username;
};

exports.saveMessage = function(message, userid, roomname, cb){
  var qLang = "INSERT INTO messages(user_id, msg_txt, rm_id) VALUES " + username;
};
