DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  user_id int(8) NOT NULL,
  msg_id int(8) NOT NULL AUTO_INCREMENT,
  msg_txt varchar(140),
  msg_date timestamp DEFAULT CURRENT_TIMESTAMP,
  rm_id int(8),
  PRIMARY KEY (msg_id)
);

CREATE TABLE users (
  user_id int(8) NOT NULL AUTO_INCREMENT,
  user_name varchar(32) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE rooms (
  rm_id int(8) NOT NULL AUTO_INCREMENT,
  room_name varchar(32),
  PRIMARY KEY (rm_id)
);

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




