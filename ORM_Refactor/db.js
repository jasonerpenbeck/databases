
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

var Users = sequelize.define('User', {
  username: { type:Sequelize.STRING, allowNull: false },
});

var Messages = sequelize.define('Message', {
  msg_txt: Sequelize.STRING,
  rm_name: Sequelize.STRING
});

Users.hasMany(Messages);
Messages.belongsTo()

Users.sync().success(function(){
    console.log("OG");
  var newUsers = Users.build({ username: "Urvashi"});
  newUsers.save().success(function(){
    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {username: "Urvashi"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

// Messages.sync().success(function(){
//   var newMessages = Messages.build({ user_id: ??, msg_id:??, msg_text:'??', rm_name:'??' });
//   newMessages.save().success(function(){

//   });
// });




exports.findAllMessages = function(cb){

  var qLang = "SELECT * FROM messages;";

  dbConnection.query(qLang, function(err,messages) {
    if(err) {
      console.log(err);
    } else {
      console.log("MESSAGES", messages);
      cb(err, messages);
    }
  });
};

exports.findUser = function(username, cb){
  var qLang =  "SELECT user_id, user_name FROM users WHERE user_name=" +dbConnection.escape(username)+ ";";

  dbConnection.query(qLang, cb);


};

exports.saveUser = function(username, cb){

  var qLang = "INSERT INTO users(user_name) VALUES(" +dbConnection.escape(username)+ ");";
  dbConnection.query(qLang, function(err,user) {
    if(err) {
      console.log(err);
    } else {
      cb(user);
    }
  });
};

exports.saveMessage = function(message, userid, roomname, cb){

  var qLang = "INSERT INTO messages(msg_txt, user_id, rm_name) VALUES(" +dbConnection.escape(message)+ "," +dbConnection.escape(userid)+ "," +dbConnection.escape(roomname)+ ");";
  dbConnection.query(qLang, function(err,message) {
    if(err) {
      console.log(err);
    } else {
      cb(message);
    }
  });

};


