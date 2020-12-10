-- generated by database functions generator automatically
-- for mysql 
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Following lines remove old tables from database
DROP TABLE IF EXISTS`ClassRooms`;
DROP TABLE IF EXISTS`Classes`;
DROP TABLE IF EXISTS`Users`;
DROP TABLE IF EXISTS`Marks`;
DROP TABLE IF EXISTS`Absente`;
DROP TABLE IF EXISTS`Notifications`;

CREATE TABLE `ClassRooms` (
`ClassRoomId` INT  NOT NULL,
`Name` VARCHAR(50),
`CreationTime` DATETIME  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ClassRooms` ADD PRIMARY KEY(`ClassRoomId`); 
ALTER TABLE `ClassRooms`  MODIFY `ClassRoomId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1; 

CREATE TABLE `Classes` (
`ClasseId` INT  NOT NULL,
`UserId` INT  NOT NULL,
`ClassRoomId` INT  NOT NULL,
`Name` VARCHAR(50),
`CreationTime` DATETIME  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Classes` ADD PRIMARY KEY(`ClasseId`); 
ALTER TABLE `Classes`  MODIFY `ClasseId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1; 

CREATE TABLE `Users` (
`UserId` INT  NOT NULL,
`FirstName` VARCHAR(30),
`LastName` VARCHAR(30),
`Email` VARCHAR(30),
`Type` INT,
`CreationTime` DATETIME  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Users` ADD PRIMARY KEY(`UserId`); 
ALTER TABLE `Users`  MODIFY `UserId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1; 

CREATE TABLE `Marks` (
`MarkId` INT  NOT NULL,
`ClasseId` INT  NOT NULL,
`UserId` INT  NOT NULL,
`Value` INT,
`CreationTime` DATETIME  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Marks` ADD PRIMARY KEY(`MarkId`); 
ALTER TABLE `Marks`  MODIFY `MarkId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1; 

CREATE TABLE `Absente` (
`AbsenteId` INT  NOT NULL,
`UserId` INT  NOT NULL,
`Date` DATETIME,
`CreationTime` DATETIME  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Absente` ADD PRIMARY KEY(`AbsenteId`); 
ALTER TABLE `Absente`  MODIFY `AbsenteId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1; 

CREATE TABLE `Notifications` (
`NotificationId` INT  NOT NULL,
`Title` VARCHAR(20),
`Message` TEXT,
`CreationTime` DATETIME  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Notifications` ADD PRIMARY KEY(`NotificationId`); 
ALTER TABLE `Notifications`  MODIFY `NotificationId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1; 

