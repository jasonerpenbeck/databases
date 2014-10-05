
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");

sequelize.authenticate();

var Users = sequelize.define('Users', {
  username: { type:Sequelize.STRING, allowNull: false }
});

var Messages = sequelize.define('Messages', {
  msg_txt: Sequelize.STRING,
  rm_name: Sequelize.STRING
});

Users.sync().success(function(){
  var newUsers = Users.build({ username: "uReddy"});
  newUsers.save().success(function(){
    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    Users.findAll({ where: {username: "uReddy"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

Messages.sync().success(function(){
  console.log("Make a mess(age)");
  var newMessages = Messages.build({msg_txt:'Saturday 4:45pm OG TIME!', rm_name:'OG_Central' });
  newMessages.save().success(function(){
   console.log('OG Central is still here. Yeah.');
   Messages.findAll({ where: {rm_name: "OG_Headquarters"} }).success(function(msgs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < msgs.length; i++) {
        console.log(msgs[i].rm_name + " exists");
      }
    });
  });
});

// sequelize.sync({force: true});

Messages.belongsTo(Users);

// exports.findAllMessages = function(cb){

//   var qLang = "SELECT * FROM messages;";

//   dbConnection.query(qLang, function(err,messages) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("MESSAGES", messages);
//       cb(err, messages);
//     }
//   });
// };

// exports.findUser = function(username, cb){
//   var qLang =  "SELECT user_id, user_name FROM users WHERE user_name=" +dbConnection.escape(username)+ ";";

//   dbConnection.query(qLang, cb);


// };

// exports.saveUser = function(username, cb){

//   var qLang = "INSERT INTO users(user_name) VALUES(" +dbConnection.escape(username)+ ");";
//   dbConnection.query(qLang, function(err,user) {
//     if(err) {
//       console.log(err);
//     } else {
//       cb(user);
//     }
//   });
// };

// exports.saveMessage = function(message, userid, roomname, cb){

//   var qLang = "INSERT INTO messages(msg_txt, user_id, rm_name) VALUES(" +dbConnection.escape(message)+ "," +dbConnection.escape(userid)+ "," +dbConnection.escape(roomname)+ ");";
//   dbConnection.query(qLang, function(err,message) {
//     if(err) {
//       console.log(err);
//     } else {
//       cb(message);
//     }
//   });

// };


