
// var path = require('path');
var host =  process.env.RDS_HOSTNAME || 'localhost';
var user =  process.env.RDS_USERNAME || 'root';
var password = process.env.RDS_PASSWORD || '1234';
var port = process.env.RDS_PORT || '3306'

var path = require('path');
// var host = process.env.host || 'localhost';
// var user = process.env.user || 'root';
// var password = process.env.password || '1234';
console.log(host, user, password)

// var host = 'smartfolio-mysql.cx8udht8nimv.us-west-2.rds.amazonaws.com';
// var user = 'smartfolioadmin';
// var password = '$martfolio';

var knex = require('knex')({
  client: 'mysql',
  connection: {
<<<<<<< HEAD
    host,
    user,
    password,
    port,
=======
    host: 'smartfolio-mysql.cx8udht8nimv.us-west-2.rds.amazonaws.com',
    user: 'smartfolioadmin',
    password: '$martfolio',
>>>>>>> ce4dc034bbd9e41f95627b25e6a6d00d14853e37
    database: 'smartfolio'
  }
});
module.exports = knex;

<<<<<<< HEAD

=======
//
>>>>>>> ce4dc034bbd9e41f95627b25e6a6d00d14853e37
// create database smartfolio;
// use smartfolio;


// CREATE TABLE `smartfolio`.`users` (
//   `idusers` INT NOT NULL AUTO_INCREMENT,
//   `username` VARCHAR(45) NOT NULL,
//   `password` TEXT NOT NULL,
//   PRIMARY KEY (`idusers`),
//   UNIQUE INDEX `username_UNIQUE` (`username` ASC));

// CREATE TABLE `smartfolio`.`images` (
//   `idimages` INT NOT NULL AUTO_INCREMENT,
//   `imgname` TEXT NOT NULL,
//   `imghash` TEXT NOT NULL,
//   `description` LONGTEXT NULL,
//   `albumname` TEXT NULL,
//   `backimgname` TEXT NOT NULL,
//   `backimghash` TEXT NOT NULL,
//   `userid` INT NOT NULL,
//   PRIMARY KEY (`idimages`));
//
//  CREATE TABLE `smartfolio`.`tags` (
//    `id` INT NOT NULL AUTO_INCREMENT,
//    `idimages` INT NULL,
//    `tag` TEXT NULL,
//     PRIMARY KEY (`id`));
//
//   ALTER TABLE `smartfolio`.`images`
// ADD INDEX `iduser_idx` (`userid` ASC);
// ALTER TABLE `smartfolio`.`images`
// ADD CONSTRAINT `iduser`
//   FOREIGN KEY (`userid`)
//   REFERENCES `smartfolio`.`users` (`idusers`)
//   ON DELETE NO ACTION
//   ON UPDATE NO ACTION;
