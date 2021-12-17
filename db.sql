-- MySQL dump 10.14  Distrib 5.5.68-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: tarsdb
-- ------------------------------------------------------
-- Server version	5.5.68-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pjr_comments`
--

DROP TABLE IF EXISTS `pjr_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pjr_comments` (
  `comments_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `user_post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`comments_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjr_comments`
--

LOCK TABLES `pjr_comments` WRITE;
/*!40000 ALTER TABLE `pjr_comments` DISABLE KEYS */;
INSERT INTO `pjr_comments` VALUES (1,'test postman comment',38,21),(2,'hello new comment (edit)',38,21),(3,'ok',42,24),(4,'test',39,22),(8,'my comment (edit)',42,21),(6,'fdsf',42,24),(7,'asdasdas',42,22),(9,'vc cvcd',42,22),(10,'csacasca',42,22),(11,'dsfsdf',44,24);
/*!40000 ALTER TABLE `pjr_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pjr_comments_vote`
--

DROP TABLE IF EXISTS `pjr_comments_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pjr_comments_vote` (
  `user_id` int(11) NOT NULL,
  `vote_count` int(11) DEFAULT NULL,
  `comments_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`comments_id`),
  KEY `user_id` (`user_id`),
  KEY `comments_id` (`comments_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjr_comments_vote`
--

LOCK TABLES `pjr_comments_vote` WRITE;
/*!40000 ALTER TABLE `pjr_comments_vote` DISABLE KEYS */;
INSERT INTO `pjr_comments_vote` VALUES (22,1,8),(22,1,7),(22,1,6),(22,0,3),(24,1,11),(24,1,10),(24,1,9),(24,1,8),(24,1,7),(24,1,6);
/*!40000 ALTER TABLE `pjr_comments_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pjr_post`
--

DROP TABLE IF EXISTS `pjr_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pjr_post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` text NOT NULL,
  `filename` text,
  `description` text,
  `poster` int(11) NOT NULL,
  `file_type` text,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjr_post`
--

LOCK TABLES `pjr_post` WRITE;
/*!40000 ALTER TABLE `pjr_post` DISABLE KEYS */;
INSERT INTO `pjr_post` VALUES (37,'2021-12-17 00:35:52','First post ','4ffadb8d222cfc8686b4591ee1e643a1','wdawdawdawddwd',21,'video/mp4'),(38,'2021-12-17 00:54:26','new post ','8233e633e5ccab3e5f275997efe2cffb','some description',21,'image/jpeg'),(39,'2021-12-17 06:15:46','test','4c1d2c235bbc6bf582b5d4512fb96799','pc time',22,'image/jpeg'),(40,'2021-12-17 06:16:40','test post','03231c30cd9efc74fb8ee1ae8faf836f','some nice description',21,'image/jpeg'),(41,'2021-12-17 06:21:52','jpeg test','6477930f020de2294a24e7ccf38b6202','testing file types',21,'image/jpeg'),(42,'2021-12-17 06:36:27','pc works','11d95af419b0b9deb50eb36f857765a6','pc time',22,'image/jpeg'),(50,'2021-12-17 07:19:56','Test','a37a08920913ba89d0e7f53c8f72fd93','sdfsdf',24,'image/jpeg');
/*!40000 ALTER TABLE `pjr_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pjr_post_vote`
--

DROP TABLE IF EXISTS `pjr_post_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pjr_post_vote` (
  `user_id` int(11) NOT NULL,
  `date_post_vote` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `vote_count` int(11) DEFAULT NULL,
  `user_post_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`user_post_id`),
  KEY `user_id` (`user_id`),
  KEY `user_post_id` (`user_post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjr_post_vote`
--

LOCK TABLES `pjr_post_vote` WRITE;
/*!40000 ALTER TABLE `pjr_post_vote` DISABLE KEYS */;
INSERT INTO `pjr_post_vote` VALUES (1,'2021-12-09 21:43:35',1,7),(1,'2021-12-09 22:37:25',1,10),(13,'2021-12-10 12:16:09',1,27),(2,'2021-12-10 12:15:15',0,14),(1,'2021-12-10 11:04:57',1,16),(3,'2021-12-12 08:58:17',1,22),(3,'2021-12-10 07:32:41',1,16),(3,'2021-12-10 07:32:43',1,15),(3,'2021-12-10 07:32:47',0,14),(3,'2021-12-11 10:50:23',1,12),(2,'2021-12-10 12:15:00',1,22),(2,'2021-12-10 07:59:33',1,15),(3,'2021-12-10 09:53:25',0,24),(1,'2021-12-10 11:22:21',0,24),(1,'2021-12-10 11:05:54',1,15),(1,'2021-12-10 11:04:52',1,22),(5,'2021-12-10 11:18:35',1,24),(5,'2021-12-10 11:18:39',0,23),(5,'2021-12-10 11:18:58',1,16),(6,'2021-12-10 11:21:35',1,14),(1,'2021-12-10 12:15:31',1,25),(6,'2021-12-10 11:24:36',0,23),(9,'2021-12-10 11:45:56',0,14),(8,'2021-12-10 11:26:21',1,25),(7,'2021-12-10 11:40:07',0,22),(3,'2021-12-12 08:58:08',1,25),(10,'2021-12-10 11:47:09',0,25),(10,'2021-12-10 11:47:14',0,23),(10,'2021-12-10 11:47:16',1,22),(10,'2021-12-10 11:47:18',1,16),(10,'2021-12-10 11:47:19',0,15),(10,'2021-12-10 11:47:21',1,14),(10,'2021-12-10 11:47:23',1,12),(10,'2021-12-10 11:51:25',0,27),(13,'2021-12-10 12:20:31',1,30),(3,'2021-12-12 08:58:06',0,28),(3,'2021-12-10 11:59:38',1,27),(2,'2021-12-10 12:14:46',0,23),(2,'2021-12-10 12:15:05',1,16),(1,'2021-12-10 12:16:01',0,12),(12,'2021-12-10 12:15:34',1,25),(12,'2021-12-10 12:16:08',1,27),(1,'2021-12-10 12:15:50',1,14),(1,'2021-12-10 12:18:20',1,28),(13,'2021-12-10 12:19:12',0,28),(14,'2021-12-10 12:27:02',1,30),(15,'2021-12-10 12:36:08',1,30),(15,'2021-12-10 12:37:09',1,31),(2,'2021-12-10 17:06:46',1,31),(3,'2021-12-12 08:58:03',0,29),(16,'2021-12-10 12:39:04',1,25),(16,'2021-12-10 12:39:08',0,23),(1,'2021-12-10 14:27:12',1,31),(16,'2021-12-10 12:39:54',1,31),(3,'2021-12-12 10:32:31',1,31),(3,'2021-12-12 08:57:58',1,30),(3,'2021-12-13 16:22:04',0,23),(3,'2021-12-13 17:13:42',1,33),(12,'2021-12-13 17:52:35',1,33),(21,'2021-12-17 00:54:32',1,38),(22,'2021-12-17 06:38:14',1,42),(24,'2021-12-17 06:37:41',1,42),(21,'2021-12-17 07:13:26',1,42);
/*!40000 ALTER TABLE `pjr_post_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pjr_user`
--

DROP TABLE IF EXISTS `pjr_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pjr_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_user` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(100) NOT NULL,
  `profile_picture` text,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` text,
  `role` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjr_user`
--

LOCK TABLES `pjr_user` WRITE;
/*!40000 ALTER TABLE `pjr_user` DISABLE KEYS */;
INSERT INTO `pjr_user` VALUES (23,'2021-12-17 00:35:59','com',NULL,'z@gmail.com','$2a$12$wok3lyDN/PFgxaajP8M7.eDnkxyDjpCQdsnJEypFPzDkfl9rIuJq2',NULL,1),(22,'2021-12-17 00:28:44','Johnkai',NULL,'Johnkaicortez@gmail.com','$2a$12$7Z1G86FglTMaZMTWEk6p/OrbUEw1V.lYDRSQEaWFhQBxFhdNy2bli',NULL,1),(24,'2021-12-17 06:11:07','techno_viking',NULL,'pavlo@ogmail.com','$2a$12$xvYL4alWGjTH5jpeTHOdTuXHCnwb4p4pm8wQ8umURm6BvistjvE1C',NULL,1),(21,'2021-12-17 00:26:24','admin','d7cfebba3aba95e01800b7fa9c7d5bc4','admin@gmail.com','$2a$12$8fp6wmpBGP.T9p7BICwHs.x4RoTLl/fbR/zilkHZeC.slhUsctUAe','\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"',0);
/*!40000 ALTER TABLE `pjr_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-17  9:20:49
