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
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

exports.findAllMessages = function(cb){

  // var qLang = "SELECT messages.msg_txt, messages.rm_id, users.user_id, users.user_name, rooms.room_id, rooms.room_name FROM messages INNER JOIN messages.user_id ON users.user_id INNER JOIN ON messages.rm_id = rooms.rm_id;";
  // var getRoom = "SELECT rm_id from rooms where room_name=" +dbConnection.escape(roomname)+ ";";
  var qLang = "SELECT * FROM messages;";
  console.log(qLang);

  dbConnection.query(qLang, function(err,messages) {
    if(err) {
      console.log(err);
    } else {
      cb(err, messages);
    }
    dbConnection.end();
  });
};

exports.findUser = function(username, cb){
  var qLang =  "SELECT user_id, user_name FROM users WHERE user_name=" +dbConnection.escape(username)+ ";";

  dbConnection.query(qLang, cb);

  // dbConnection.end();

};

exports.saveUser = function(username, cb){

  var qLang = "INSERT INTO users(user_name) VALUES(" +dbConnection.escape(username)+ ");";
  dbConnection.query(qLang, function(err,user) {
    if(err) {
      console.log(err);
    } else {
      cb(user);
    }
    // dbConnection.end();
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  var getRmIDLang = "SELECT rm_id from rooms where room_name=" +dbConnection.escape(roomname)+ ";";
  var getRmID = dbConnection.query(getRmIDLang);
  console.log(getRmID);

  var qLang = "INSERT INTO messages(user_id, msg_txt, rm_id) VALUES(" +dbConnection.escape(userid)+ "," +dbConnection.escape(message)+ "," +dbConnection.escape(getRmID)+ ");";
  dbConnection.query(qLang, function(err,message) {
    if(err) {
      console.log(err);
    } else {
      cb(message);
    }
    // dbConnection.end();
  });

};


