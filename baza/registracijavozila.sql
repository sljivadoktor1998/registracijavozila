-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Aug 25, 2020 at 10:37 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registracijavozila`
--

-- --------------------------------------------------------

--
-- Table structure for table `registrovana_vozila`
--

DROP TABLE IF EXISTS `registrovana_vozila`;
CREATE TABLE IF NOT EXISTS `registrovana_vozila` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Marka_Model` varchar(250) NOT NULL,
  `Vrsta_Vozila` varchar(100) NOT NULL,
  `Godiste` int(11) NOT NULL,
  `Snaga_Motora` text NOT NULL,
  `Zapremina_Motora` int(11) NOT NULL,
  `Cena` float NOT NULL,
  `Ime_Prezime` varchar(250) NOT NULL,
  `Adresa` varchar(300) NOT NULL,
  `datumVazenja` date NOT NULL,
  `tablice` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tablice` (`tablice`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `registrovana_vozila`
--

INSERT INTO `registrovana_vozila` (`id`, `Marka_Model`, `Vrsta_Vozila`, `Godiste`, `Snaga_Motora`, `Zapremina_Motora`, `Cena`, `Ime_Prezime`, `Adresa`, `datumVazenja`, `tablice`) VALUES
(16, 'Fiat Punto', 'Putničko', 2016, '66kW (90KS)', 1200, 2480, 'Milan Mladenovic', 'Nis', '2021-08-23', 'ni911aa'),
(17, 'Fiat Punto', 'Putničko', 2018, '55kW (75KS)', 1500, 5470, 'Stefan Stefanovic', 'Beograd', '2021-08-23', 'bg000aa'),
(18, 'BMW 320D', 'Putničko', 2017, '85kW (116KS)', 2000, 11210, 'Petar Petrovic', 'Kragujevac', '2021-08-23', 'kg444oo'),
(19, 'Fiat Punto', 'Putničko', 2020, '80kW (109KS)', 1200, 2480, 'Stojan Stojanovic', 'Aleksinac', '2021-08-23', 'al250ll'),
(20, 'Ford Focus', 'Putničko', 2016, '66kW (90KS)', 1600, 5470, 'Nikola Colovic', 'Aleksinac', '2021-08-23', 'al543oa'),
(21, 'Ford Focus', 'Putničko', 2010, '96kW (131KS)', 2000, 6726, 'Miroslav Lazanski', 'Mirijevo,Beograd', '2021-08-23', 'bg140le');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
