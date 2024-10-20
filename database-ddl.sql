-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: nutech
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(255) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'Banner 1','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet',NULL,NULL),(2,'Banner 2','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet',NULL,NULL),(3,'Banner 3','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet',NULL,NULL),(4,'Banner 4','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet',NULL,NULL),(5,'Banner 5','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet',NULL,NULL),(6,'Banner 6','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet',NULL,NULL);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(255) NOT NULL,
  `service_code` varchar(255) NOT NULL,
  `service_icon` varchar(255) NOT NULL,
  `service_tariff` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Pajak PBB','PAJAK','https://nutech-integrasi.app/dummy.jpg',40000,NULL,NULL),(2,'Listrik','PLN','https://nutech-integrasi.app/dummy.jpg',10000,NULL,NULL),(3,'PDAM Berlangganan','PDAM','https://nutech-integrasi.app/dummy.jpg',40000,NULL,NULL),(4,'Pulsa','PULSA','https://nutech-integrasi.app/dummy.jpg',40000,NULL,NULL),(5,'PGN Berlangganan','PGN','https://nutech-integrasi.app/dummy.jpg',50000,NULL,NULL),(6,'Musik Berlangganan','MUSIK','https://nutech-integrasi.app/dummy.jpg',50000,NULL,NULL),(7,'TV Berlangganan','TV','https://nutech-integrasi.app/dummy.jpg',50000,NULL,NULL),(8,'Paket data','PAKET_DATA','https://nutech-integrasi.app/dummy.jpg',50000,NULL,NULL),(9,'Voucher Game','VOUCHER_GAME','https://nutech-integrasi.app/dummy.jpg',100000,NULL,NULL),(10,'Voucher Makanan','VOUCHER_MAKANAN','https://nutech-integrasi.app/dummy.jpg',100000,NULL,NULL),(11,'Qurban','QURBAN','https://nutech-integrasi.app/dummy.jpg',200000,NULL,NULL),(12,'Zakat','ZAKAT','https://nutech-integrasi.app/dummy.jpg',300000,NULL,NULL),(13,'Topup','TOPUP','https://nutech-integrasi.app/dummy.jpg',0,NULL,NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nandax1@mail.com','$2b$10$7237dzDZHc9ERfDeWdCIJuxXrmgKz2a2FIL0Lm3d9tOQiFxWW.w/a','2024-10-19 03:25:39',NULL),(2,'nandax','$2b$10$tvOMaZKgFTGRihhMXgoP0eJxeCp/CxJ/4GUDDxp9npxyV335u9amW','2024-10-19 05:39:20',NULL),(3,'nandax13@mail.com','$2b$10$F5SH.7HmThZGS9Y736yszud08umWowz19nlUEOOkje3RoB2EJjLPa','2024-10-19 05:42:51',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_balance`
--

DROP TABLE IF EXISTS `user_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_balance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `balance` int NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_balance_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_balance`
--

LOCK TABLES `user_balance` WRITE;
/*!40000 ALTER TABLE `user_balance` DISABLE KEYS */;
INSERT INTO `user_balance` VALUES (1,1,52266,'2024-10-19 03:25:39','2024-10-19 06:05:59'),(2,2,0,'2024-10-19 05:39:20',NULL),(3,3,0,'2024-10-19 05:42:51',NULL);
/*!40000 ALTER TABLE `user_balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (1,1,'User','Nutech',NULL,'2024-10-19 03:25:39',NULL),(2,2,'User','Nutech',NULL,'2024-10-19 05:39:20',NULL),(3,3,'User','Nutech',NULL,'2024-10-19 05:42:51',NULL);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_transaction`
--

DROP TABLE IF EXISTS `user_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `total_amount` int NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_transaction_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_transaction`
--

LOCK TABLES `user_transaction` WRITE;
/*!40000 ALTER TABLE `user_transaction` DISABLE KEYS */;
INSERT INTO `user_transaction` VALUES (7,1,'INV20241019-291','PULSA','Pulsa',40000,NULL,NULL),(8,1,'INV20241019-459','PULSA','Pulsa',40000,'2024-10-19 03:36:58',NULL),(9,1,'INV20241019-166','PULSA','Pulsa',40000,'2024-10-19 03:37:18',NULL),(10,1,'INV20241019-836','PULSA','Pulsa',40000,'2024-10-19 03:38:53',NULL),(11,1,'INV20241019-781','PULSA','Pulsa',40000,'2024-10-19 03:39:17',NULL),(12,1,'INV20241019-200','PULSA','Pulsa',40000,'2024-10-19 03:52:02',NULL),(13,1,'INV20241019-777','TOPUP','Topup',0,'2024-10-19 04:37:11',NULL),(14,1,'INV20241019-150','TOPUP','Topup',0,'2024-10-19 04:37:17',NULL),(15,1,'INV20241019-565','TOPUP','Topup',44111,'2024-10-19 04:41:58',NULL),(16,1,'INV20241019-493','TOPUP','Topup',44111,'2024-10-19 06:05:27',NULL),(17,1,'INV20241019-874','TOPUP','Topup',44111,'2024-10-19 06:05:59',NULL);
/*!40000 ALTER TABLE `user_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nutech'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-20  9:24:52
