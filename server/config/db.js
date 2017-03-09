var host =  process.env.RDS_HOSTNAME || 'localhost';
var user =  process.env.RDS_USERNAME || 'root';
var password = process.env.RDS_PASSWORD || '1234';
var port = process.env.RDS_PORT || '3306';



var knex = require('knex')({
  client: 'mysql',
  connection: {
    host,
    user,
    password,
    port,
    database: 'smartfolio'
  }
});
module.exports = knex;

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

// CREATE TABLE `smartfolio`.`albums` (
//   `idalbums` INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   `name` BLOB NOT NULL,
//   `description` LONGTEXT NULL,
//   `userID` INT NOT NULL,
//   PRIMARY KEY (`idalbums`),
//   UNIQUE INDEX `idalbums_UNIQUE` (`idalbums` ASC),
//   INDEX `userID_idx` (`userID` ASC),
//   CONSTRAINT `userID`
//     FOREIGN KEY (`userID`)
//     REFERENCES `smartfolio`.`users` (`idusers`)
//     ON DELETE NO ACTION
//     ON UPDATE NO ACTION);

// CREATE TABLE `smartfolio`.`album-image` (
//   `idalbum-image` INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   `imageID` INT(11) NOT NULL,
//   `albumID` INT(10) UNSIGNED NOT NULL,
//   PRIMARY KEY (`idalbum-image`),
//   INDEX `imagesID_idx` (`imageID` ASC),
//   UNIQUE INDEX `idalbum-image_UNIQUE` (`idalbum-image` ASC),
//   UNIQUE INDEX `imageID_UNIQUE` (`imageID` ASC),
//   UNIQUE INDEX `albumID_UNIQUE` (`albumID` ASC),
//   CONSTRAINT `imagesID`
//     FOREIGN KEY (`imageID`)
//     REFERENCES `smartfolio`.`images` (`idimages`)
//     ON DELETE NO ACTION
//     ON UPDATE NO ACTION,
//   CONSTRAINT `albumsID`
//     FOREIGN KEY (`albumID`)
//     REFERENCES `smartfolio`.`albums` (`idalbums`)
//     ON DELETE NO ACTION
//     ON UPDATE NO ACTION);

// ALTER TABLE `smartfolio`.`album_image` 
// ADD INDEX `albumid_idx` (`albumID` ASC);
// ALTER TABLE `smartfolio`.`album_image`
// ADD CONSTRAINT `albumid`
//   FOREIGN KEY (`albumID`)
//   REFERENCES `smartfolio`.`albums` (`userID`)
//   ON DELETE NO ACTION
//   ON UPDATE NO ACTION;


// CREATE TABLE `smartfolio`.`shared` (
//   `idshared` INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   `ownerid` INT(11) NULL,
//   `albumid` INT(10) UNSIGNED NULL,
//   `shareUserid` INT(11) NULL,
//   `permission` TEXT NULL,
//   PRIMARY KEY (`idshared`),
//   INDEX `idusers_idx` (`ownerid` ASC),
//   INDEX `idalbums_idx` (`albumid` ASC),
//   CONSTRAINT `idusers`
//     FOREIGN KEY (`ownerid`)
//     REFERENCES `smartfolio`.`users` (`idusers`)
//     ON DELETE NO ACTION
//     ON UPDATE NO ACTION,
//   CONSTRAINT `idalbums`
//     FOREIGN KEY (`albumid`)
//     REFERENCES `smartfolio`.`albums` (`idalbums`)
//     ON DELETE NO ACTION
//     ON UPDATE NO ACTION);
